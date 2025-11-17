import { AuthToken, User } from "tweeter-shared";
import { Service } from "./Service";
import { ServerFacade } from "./ServerFacade";

export class UserService implements Service {
  private server = new ServerFacade();
  public async getUser(
    authToken: AuthToken,
    alias: string
  ): Promise<User | null> {
    return this.server.getUser(authToken, alias);
  }

  public async getIsFollowerStatus(
    authToken: AuthToken,
    user: User,
    selectedUser: User
  ): Promise<boolean> {
    return this.server.getIsFollower(authToken.token, user, selectedUser);
  }

  public async getFolloweeCount(
    authToken: AuthToken,
    user: User
  ): Promise<number> {
    return this.server.getFolloweeCount(user.alias);
  }

  public async getFollowerCount(
    authToken: AuthToken,
    user: User
  ): Promise<number> {
    return this.server.getFollowerCount(user.alias);
  }

  public async unfollow(
    authToken: AuthToken,
    userToUnfollow: User
  ): Promise<void> {
    this.server.unfollow(authToken.token, userToUnfollow);
  }

  public async follow(authToken: AuthToken, userToFollow: User): Promise<void> {
    this.server.follow(authToken.token, userToFollow);
  }
}
