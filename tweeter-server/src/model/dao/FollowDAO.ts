import { PagedUserItemResponse, UserDto } from "tweeter-shared";
import { DAO } from "./DAO";

export interface FollowDAO extends DAO {
  LoadMoreFollowers(
    token: string,
    userAlias: string,
    pageSize: number,
    lastItem: UserDto | null
  ): PagedUserItemResponse;
  LoadMoreFollowees(
    token: string,
    userAlias: string,
    pageSize: number,
    lastItem: UserDto | null
  ): PagedUserItemResponse;
  GetIsFollowerStatus(
    token: string,
    user: UserDto,
    selectedUser: UserDto
  ): boolean;
  GetFollowerCount(alias: string): number;
  GetFolloweeCount(alias: string): number;
  Follow(token: string, userToFollow: UserDto): boolean;
  Unfollow(token: string, userToFollow: UserDto): boolean;
}
