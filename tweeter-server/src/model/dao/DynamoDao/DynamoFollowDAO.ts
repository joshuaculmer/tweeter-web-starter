import { UserDto } from "tweeter-shared";
import { FollowDAO } from "../FollowDAO";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  QueryCommand,
  DeleteCommand,
  PutCommand,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";
import { batchGetUsers, getUserCommand } from "./DynamoUserDAO";

export class Follow {
  follower_alias: string;
  followee_alias: string;

  constructor(follower: string, followee: string) {
    this.followee_alias = followee;
    this.follower_alias = follower;
  }

  toString(): string {
    return (
      "follow{ follower handle: " +
      this.follower_alias +
      "\nfollowee handle:" +
      this.followee_alias +
      "}"
    );
  }
}

export class DynamoFollowDAO implements FollowDAO {
  private authTableName = "authentication";
  private authTokenTableName = "authtoken";
  private followTableName = "follow";
  private client = DynamoDBDocumentClient.from(new DynamoDBClient({}));
  private readonly followerAttr = "follower_alias";
  private readonly followeeAttr = "followee_alias";
  private readonly indexName = "follow_index";

  private deleteFollow = async (follow: Follow): Promise<void> => {
    await this.client.send(
      new DeleteCommand({
        TableName: this.followTableName,
        Key: {
          follower_alias: follow.follower_alias,
          followee_alias: follow.followee_alias,
        },
      })
    );
  };
  private generateFollowItem = async (follow: Follow) => {
    return {
      [this.followerAttr]: follow.follower_alias,
      [this.followeeAttr]: follow.followee_alias,
    };
  };

  public putFollows = async (follow: Follow) => {
    const params = {
      TableName: this.followTableName,
      Item: this.generateFollowItem(follow),
    };
    await this.client.send(new PutCommand(params));
  };

  private async queryFollows(
    keyAttr: string,
    keyValue: string,
    sortAttr: string,
    lastSortValue: string | undefined,
    pageSize: number,
    indexName?: string
  ): Promise<[Follow[], boolean]> {
    const params: any = {
      TableName: this.followTableName,
      KeyConditionExpression: "#key = :keyValue",
      ExpressionAttributeNames: {
        "#key": keyAttr,
      },
      ExpressionAttributeValues: {
        ":keyValue": keyValue,
      },
      Limit: pageSize,
    };

    if (indexName) {
      params.IndexName = indexName;
    }

    // Only set ExclusiveStartKey if we have a valid lastSortValue
    if (
      lastSortValue !== undefined &&
      lastSortValue !== null &&
      lastSortValue !== ""
    ) {
      // ExclusiveStartKey must contain BOTH follower_alias AND followee_alias
      // The values are swapped depending on which query we're doing
      if (indexName) {
        // Querying GSI: partition=followee_alias, sort=follower_alias
        params.ExclusiveStartKey = {
          [this.followerAttr]: lastSortValue, // sort key value (last follower)
          [this.followeeAttr]: keyValue, // partition key value
        };
      } else {
        // Querying base table: partition=follower_alias, sort=followee_alias
        params.ExclusiveStartKey = {
          [this.followerAttr]: keyValue, // partition key value
          [this.followeeAttr]: lastSortValue, // sort key value (last followee)
        };
      }
    }
    // console.log("Query params:", JSON.stringify(params, null, 2));

    const data = await this.client.send(new QueryCommand(params));

    // console.log("Query result:", {
    //   itemCount: data.Items?.length || 0,
    //   hasMore: !!data.LastEvaluatedKey,
    // });
    const follows: Follow[] = [];

    if (data.Items) {
      for (const item of data.Items) {
        const follower = item[this.followerAttr];
        const followee = item[this.followeeAttr];

        if (follower && followee) {
          follows.push(
            new Follow(
              follower as unknown as string,
              followee as unknown as string
            )
          );
        }
      }
    }

    const hasMorePages = !!data.LastEvaluatedKey;
    return [follows, hasMorePages];
  }

  async LoadMoreFollowers(
    token: string,
    userAlias: string,
    pageSize: number,
    lastItem: UserDto | null
  ): Promise<[UserDto[], boolean]> {
    const [followers, hasMore] = await this.queryFollows(
      this.followeeAttr,
      userAlias,
      this.followerAttr,
      lastItem ? lastItem.alias : undefined,
      pageSize,
      this.indexName
    );
    const followerAliases = followers.map((follow) => follow.follower_alias);
    // console.log("Follower Aliases: ", followerAliases);
    const users = await batchGetUsers(
      followerAliases,
      this.authTableName,
      this.client
    );
    // console.log("Follower Users: ", users);
    return [users, hasMore];
  }
  async LoadMoreFollowees(
    token: string,
    userAlias: string,
    pageSize: number,
    lastItem: UserDto | null
  ): Promise<[UserDto[], boolean]> {
    const [followees, hasMore] = await this.queryFollows(
      this.followerAttr,
      userAlias,
      this.followeeAttr,
      lastItem ? lastItem.alias : undefined,
      pageSize
    );
    const followeeAliases = followees.map((follow) => follow.followee_alias);
    // console.log("Followee Aliases: ", followeeAliases);
    const users = await batchGetUsers(
      followeeAliases,
      this.authTableName,
      this.client
    );
    // console.log("Followee Users: ", users);
    return [users, hasMore];
  }

  GetIsFollowerStatus(
    token: string,
    user: UserDto,
    selectedUser: UserDto
  ): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  GetFollowerCount = async (alias: string): Promise<number> => {
    const userData = await getUserCommand(
      this.authTableName,
      alias,
      this.client
    );
    console.log("GetFollowerCount - userData:", userData);

    if (!userData.Item || !userData.Item.follower_count) {
      return 0;
    }
    console.log("Follower count data:", userData.Item.follower_count.N);
    return Number(userData.Item.follower_count.N);
  };
  GetFolloweeCount = async (alias: string): Promise<number> => {
    const userData = await getUserCommand(
      this.authTableName,
      alias,
      this.client
    );
    console.log("GetFolloweeCount - userData:", userData);
    if (!userData.Item || !userData.Item.followee_count) {
      return 0;
    }
    console.log("Followee count data:", userData.Item.followee_count.N);
    return Number(userData.Item.followee_count.N);
  };

  async Follow(token: string, userToFollow: UserDto): Promise<boolean> {
    // check if token is valid
    if (!token) {
      throw new Error("Token is invalid");
    }

    // Query the GSI to find the username associated with this token
    const queryResult = await this.client.send(
      new QueryCommand({
        TableName: this.authTokenTableName,
        IndexName: "authtoken_index",
        KeyConditionExpression: "authtoken = :token",
        ExpressionAttributeValues: {
          ":token": token,
        },
      })
    );

    if (!queryResult.Items || queryResult.Items.length === 0) {
      return false; // Token not found
    }

    const username = queryResult!.Items[0]!.username!;

    // update follow info
    console.log("Following user: ", userToFollow);
    const follow = new Follow(username, userToFollow.alias);
    await this.putFollows(follow);

    // increment follow counts for this user in authTableName table
    const decrementFollowerParams = {
      TableName: this.authTableName,
      Key: { username: username },
      UpdateExpression: "SET follower_count = follower_count + :inc",
      ExpressionAttributeValues: {
        ":inc": 1,
      },
      ReturnValues: "UPDATED_NEW" as const,
    };

    await this.client.send(new UpdateCommand(decrementFollowerParams));

    // increment followee count for userToUnfollow in authTableName table
    const decrementFolloweeParams = {
      TableName: this.authTableName,
      Key: { username: userToFollow.alias },
      UpdateExpression: "SET followee_count = followee_count + :inc",
      ExpressionAttributeValues: {
        ":inc": 1,
      },
      ReturnValues: "UPDATED_NEW" as const,
    };
    await this.client.send(new UpdateCommand(decrementFolloweeParams));

    return true;
  }

  async Unfollow(token: string, userToUnfollow: UserDto): Promise<boolean> {
    if (!token) {
      throw new Error("Token is invalid");
    }

    // Query the GSI to find the username associated with this token
    const queryResult = await this.client.send(
      new QueryCommand({
        TableName: this.authTokenTableName,
        IndexName: "authtoken_index",
        KeyConditionExpression: "authtoken = :token",
        ExpressionAttributeValues: {
          ":token": token,
        },
      })
    );

    if (!queryResult.Items || queryResult.Items.length === 0) {
      return false; // Token not found
    }

    const username = queryResult!.Items[0]!.username!;

    // update follow info
    console.log("Unfollowing user: ", userToUnfollow);
    const follow = new Follow(username, userToUnfollow.alias);
    await this.deleteFollow(follow);

    // Decrement follow counts for this user in authTableName table
    const decrementFollowerParams = {
      TableName: this.authTableName,
      Key: { username: username },
      UpdateExpression: "SET follower_count = follower_count - :dec",
      ExpressionAttributeValues: {
        ":dec": 1,
      },
      ReturnValues: "UPDATED_NEW" as const,
    };

    await this.client.send(new UpdateCommand(decrementFollowerParams));

    // decrement followee count for userToUnfollow in authTableName table
    const decrementFolloweeParams = {
      TableName: this.authTableName,
      Key: { username: userToUnfollow.alias },
      UpdateExpression: "SET followee_count = followee_count - :dec",
      ExpressionAttributeValues: {
        ":dec": 1,
      },
      ReturnValues: "UPDATED_NEW" as const,
    };
    await this.client.send(new UpdateCommand(decrementFolloweeParams));
    return true;
  }
}
