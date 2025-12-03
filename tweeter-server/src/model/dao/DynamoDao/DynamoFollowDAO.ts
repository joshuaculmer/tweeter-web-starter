import { UserDto } from "tweeter-shared";
import { FollowDAO } from "../FollowDAO";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  QueryCommand,
  DeleteCommand,
  PutCommand,
  BatchGetCommand,
} from "@aws-sdk/lib-dynamodb";
import { batchGetUsers, getUserCommand } from "./DynamoUserDAO";

export class Follow {
  follower_handle: string;
  followee_handle: string;

  constructor(follower: string, followee: string) {
    this.followee_handle = followee;
    this.follower_handle = follower;
  }

  toString(): string {
    return (
      "follow{ follower handle: " +
      this.follower_handle +
      "\nfollowee handle:" +
      this.followee_handle +
      "}"
    );
  }
}

export class DynamoFollowDAO implements FollowDAO {
  private authTableName = "authentication";
  private followTableName = "follow";
  private client = DynamoDBDocumentClient.from(new DynamoDBClient({}));
  private readonly followerAttr = "follower_alias";
  private readonly followeeAttr = "followee_alias";
  private readonly indexName = "follow_index";

  public async deleteFollow(follow: Follow) {
    const params = {
      TableName: this.followTableName,
      Key: this.generateFollowItem(follow),
    };
    await this.client.send(new DeleteCommand(params));
  }

  private generateFollowItem(follow: Follow) {
    return {
      [this.followerAttr]: follow.follower_handle,
      [this.followeeAttr]: follow.followee_handle,
    };
  }

  public async putFollows(follow: Follow) {
    const params = {
      TableName: this.followTableName,
      Item: this.generateFollowItem(follow),
    };
    await this.client.send(new PutCommand(params));
  }

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
    const followerAliases = followers.map((follow) => follow.follower_handle);
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
    const followeeAliases = followees.map((follow) => follow.followee_handle);
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
  Follow(token: string, userToFollow: UserDto): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  Unfollow(token: string, userToFollow: UserDto): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}
