import {
  AuthToken,
  User,
  FakeData,
  UserDto,
  TweeterResponse,
  NumberResponse,
  UserResponse,
  BooleanResponse,
  GetIsFollowerRequest,
  FollowRequest,
  GetUserRequest,
  UnfollowRequest,
  GetFollowerCountRequest,
  GetFolloweeCountRequest,
} from "tweeter-shared";

export class UserService {
  public async getUser(request: GetUserRequest): Promise<UserResponse> {
    // TODO: Replace with the result of calling server
    const response: User | null = FakeData.instance.findUserByAlias(
      request.userAlias
    );
    return {
      user: response ? response.dto : null,
      success: true,
      message: "Fetched user successfully",
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
