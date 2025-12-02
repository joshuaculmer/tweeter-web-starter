import { UserDto } from "tweeter-shared";
import { FollowDAO } from "../FollowDAO";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { getUserCommand } from "./DynamoUserDAO";

export class DynamoFollowDAO implements FollowDAO {
  private authTableName = "authentication";
  private followTableName = "follow";
  private client = DynamoDBDocumentClient.from(new DynamoDBClient({}));

  LoadMoreFollowers(
    token: string,
    userAlias: string,
    pageSize: number,
    lastItem: UserDto | null
  ): Promise<[UserDto[], boolean]> {
    throw new Error("Method not implemented.");
  }
  LoadMoreFollowees(
    token: string,
    userAlias: string,
    pageSize: number,
    lastItem: UserDto | null
  ): Promise<[UserDto[], boolean]> {
    throw new Error("Method not implemented.");
  }
  GetIsFollowerStatus(
    token: string,
    user: UserDto,
    selectedUser: UserDto
  ): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  async GetFollowerCount(alias: string): Promise<number> {
    const userData = await getUserCommand(
      this.authTableName,
      alias,
      this.client
    );

    if (!userData.Item || !userData.Item.follower_count) {
      return 0;
    }
    return Number(userData.Item.follower_count.N);
  }
  async GetFolloweeCount(alias: string): Promise<number> {
    const userData = await getUserCommand(
      this.authTableName,
      alias,
      this.client
    );

    if (!userData.Item || !userData.Item.followee_count) {
      return 0;
    }
    return Number(userData.Item.followee_count.N);
  }
  Follow(token: string, userToFollow: UserDto): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  Unfollow(token: string, userToFollow: UserDto): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}