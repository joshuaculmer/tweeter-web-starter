import {
  AuthToken,
  User,
  FakeData,
  UserDto,
  TweeterResponse,
  NumberResponse,
  UserResponse,
  BooleanResponse,
} from "tweeter-shared";

export class UserService {
  public async getUser(token: string, alias: string): Promise<UserResponse> {
    // TODO: Replace with the result of calling server
    const response: User | null = FakeData.instance.findUserByAlias(alias);
    return {
      user: response ? response.dto : null,
      success: true,
      message: "Fetched user successfully",
    };
  }

  public async getIsFollowerStatus(
    token: string,
    user: UserDto,
    selectedUser: UserDto
  ): Promise<BooleanResponse> {
    // TODO: Replace with the result of calling server
    return {
      bool: FakeData.instance.isFollower(),
      success: true,
      message: "Fetched is follower status successfully",
    };
  }

  public async getFolloweeCount(
    token: string,
    user: UserDto
  ): Promise<NumberResponse> {
    // TODO: Replace with the result of calling server
    const count = await FakeData.instance.getFolloweeCount(user.alias);
    return {
      success: true,
      message: "Fetched followee count successfully",
      Number: count,
    };
  }

  public async getFollowerCount(
    token: string,
    user: UserDto
  ): Promise<NumberResponse> {
    // TODO: Replace with the result of calling server
    const count = await FakeData.instance.getFollowerCount(user.alias);
    return {
      success: true,
      message: "Fetched follower count successfully",
      Number: count,
    };
  }

  public async unfollow(
    token: string,
    userToUnfollow: UserDto
  ): Promise<TweeterResponse> {
    // Pause so we can see the unfollow message. Remove when connected to the server
    await new Promise((f) => setTimeout(f, 2000));
    // TODO: Call the server
    return { success: true, message: "Unfollowed successfully" };
  }

  public async follow(
    token: string,
    userToFollow: UserDto
  ): Promise<TweeterResponse> {
    // Pause so we can see the follow message. Remove when connected to the server
    await new Promise((f) => setTimeout(f, 2000));
    // TODO: Call the server
    return { success: true, message: "Followed successfully" };
  }
}
