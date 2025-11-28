import { PagedUserItemResponse, UserDto } from "tweeter-shared";
import { DAO } from "./DAO";

export interface FollowDAO extends DAO {
  LoadMoreFollowers(
    token: string,
    userAlias: string,
    pageSize: number,
    lastItem: UserDto | null
  ): Promise<[UserDto[], boolean]>;
  LoadMoreFollowees(
    token: string,
    userAlias: string,
    pageSize: number,
    lastItem: UserDto | null
  ): Promise<[UserDto[], boolean]>;
  GetIsFollowerStatus(
    token: string,
    user: UserDto,
    selectedUser: UserDto
  ): Promise<boolean>;
  GetFollowerCount(alias: string): Promise<number>;
  GetFolloweeCount(alias: string): Promise<number>;
  Follow(token: string, userToFollow: UserDto): Promise<boolean>;
  Unfollow(token: string, userToFollow: UserDto): Promise<boolean>;
}
