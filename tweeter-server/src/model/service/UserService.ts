import { AuthToken, User, FakeData, UserDto } from "tweeter-shared";

export class UserService {
  public async getUser(token: string, alias: string): Promise<UserDto | null> {
    // TODO: Replace with the result of calling server
    const response: User | null = FakeData.instance.findUserByAlias(alias);
    return response ? response.dto : null;
  }

  public async getIsFollowerStatus(
    token: string,
    user: User,
    selectedUser: User
  ): Promise<boolean> {
    // TODO: Replace with the result of calling server
    return FakeData.instance.isFollower();
  }

  public async getFolloweeCount(token: string, user: User): Promise<number> {
    // TODO: Replace with the result of calling server
    return FakeData.instance.getFolloweeCount(user.alias);
  }

  public async getFollowerCount(token: string, user: User): Promise<number> {
    // TODO: Replace with the result of calling server
    return FakeData.instance.getFollowerCount(user.alias);
  }

  public async unfollow(token: string, userToUnfollow: User): Promise<void> {
    // Pause so we can see the unfollow message. Remove when connected to the server
    await new Promise((f) => setTimeout(f, 2000));
    // TODO: Call the server
  }

  public async follow(authToken: AuthToken, userToFollow: User): Promise<void> {
    // Pause so we can see the follow message. Remove when connected to the server
    await new Promise((f) => setTimeout(f, 2000));
    // TODO: Call the server
  }
}
