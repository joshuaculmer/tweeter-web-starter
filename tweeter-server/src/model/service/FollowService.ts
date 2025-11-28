import {
  User,
  FakeData,
  UserDto,
  PagedUserItemResponse,
  PagedUserItemRequest,
  BooleanResponse,
  FollowRequest,
  GetFolloweeCountRequest,
  GetFollowerCountRequest,
  GetIsFollowerRequest,
  NumberResponse,
  TweeterResponse,
} from "tweeter-shared";
import { UnfollowRequest } from "tweeter-shared/src/model/net/request/UnfollowRequest";
import { FollowDAO } from "../dao/FollowDAO";

export class FollowService {
  private dao: FollowDAO;

  public constructor(dao: FollowDAO) {
    this.dao = dao;
  }

  public async loadMoreFollowees(
    request: PagedUserItemRequest
  ): Promise<PagedUserItemResponse> {
    const [items, hasMore] = await this.dao.LoadMoreFollowees(
      request.token,
      request.userAlias,
      request.pageSize,
      request.lastItem
    );

    return {
      items: items,
      hasMore: hasMore,
      success: true,
      message: "Fetched followee data successfully",
    };
  }

  public async loadMoreFollowers(
    request: PagedUserItemRequest
  ): Promise<PagedUserItemResponse> {
    const [items, hasMore] = await this.dao.LoadMoreFollowers(
      request.token,
      request.userAlias,
      request.pageSize,
      request.lastItem
    );

    return {
      items: items,
      hasMore: hasMore,
      success: true,
      message: "Fetched follower data successfully",
    };
  }

  public async getIsFollowerStatus(
    request: GetIsFollowerRequest
  ): Promise<BooleanResponse> {
    const isFollower = await this.dao.GetIsFollowerStatus(
      request.token,
      request.user,
      request.selectedUser
    );
    return {
      bool: isFollower,
      success: true,
      message: "Fetched is follower status successfully",
    };
  }

  public async getFolloweeCount(
    request: GetFolloweeCountRequest
  ): Promise<NumberResponse> {
    const count = await this.dao.GetFolloweeCount(request.alias);
    return {
      success: true,
      message: "Fetched followee count successfully",
      Number: count,
    };
  }

  public async getFollowerCount(
    request: GetFollowerCountRequest
  ): Promise<NumberResponse> {
    const count = await this.dao.GetFollowerCount(request.alias);
    return {
      success: true,
      message: "Fetched follower count successfully",
      Number: count,
    };
  }

  public async unfollow(request: UnfollowRequest): Promise<TweeterResponse> {
    const success = await this.dao.Unfollow(
      request.token,
      request.userToUnfollow
    );
    if (success === false) {
      return { success: false, message: "Failed to unfollow user" };
    }
    return { success: true, message: "Unfollowed successfully" };
  }

  public async follow(request: FollowRequest): Promise<TweeterResponse> {
    const success = await this.dao.Follow(request.token, request.userToFollow);
    if (success === false) {
      return { success: false, message: "Failed to follow user" };
    }
    return { success: true, message: "Followed successfully" };
  }
}
