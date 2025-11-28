import {
  AuthToken,
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

export class FollowService {
  public async loadMoreFollowees(
    request: PagedUserItemRequest
  ): Promise<PagedUserItemResponse> {
    return await this.getFakeData(
      request.lastItem,
      request.pageSize,
      request.userAlias
    );
  }

  public async loadMoreFollowers(
    request: PagedUserItemRequest
  ): Promise<PagedUserItemResponse> {
    // TODO: Replace with the result of calling server
    return await this.getFakeData(
      request.lastItem,
      request.pageSize,
      request.userAlias
    );
  }

  private async getFakeData(
    lastItem: UserDto | null,
    pageSize: number,
    userAlias: string
  ): Promise<PagedUserItemResponse> {
    const [items, hasMore] = FakeData.instance.getPageOfUsers(
      User.fromDto(lastItem),
      pageSize,
      userAlias
    );
    const dtos = items.map((user) => user.dto);
    return {
      items: dtos,
      hasMore: hasMore,
      success: true,
      message: "Fetched follow data successfully",
    };
  }

  public async getIsFollowerStatus(
    request: GetIsFollowerRequest
  ): Promise<BooleanResponse> {
    // TODO: Replace with the result of calling server
    return {
      bool: FakeData.instance.isFollower(),
      success: true,
      message: "Fetched is follower status successfully",
    };
  }

  public async getFolloweeCount(
    request: GetFolloweeCountRequest
  ): Promise<NumberResponse> {
    // TODO: Replace with the result of calling server
    const count = await FakeData.instance.getFolloweeCount(request.alias);
    return {
      success: true,
      message: "Fetched followee count successfully",
      Number: count,
    };
  }

  public async getFollowerCount(
    request: GetFollowerCountRequest
  ): Promise<NumberResponse> {
    // TODO: Replace with the result of calling server
    const count = await FakeData.instance.getFollowerCount(request.alias);
    return {
      success: true,
      message: "Fetched follower count successfully",
      Number: count,
    };
  }

  public async unfollow(request: UnfollowRequest): Promise<TweeterResponse> {
    // Pause so we can see the unfollow message. Remove when connected to the server
    await new Promise((f) => setTimeout(f, 2000));
    // TODO: Call the server
    return { success: true, message: "Unfollowed successfully" };
  }

  public async follow(request: FollowRequest): Promise<TweeterResponse> {
    // Pause so we can see the follow message. Remove when connected to the server
    await new Promise((f) => setTimeout(f, 2000));
    // TODO: Call the server
    return { success: true, message: "Followed successfully" };
  }
}
