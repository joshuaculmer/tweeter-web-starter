import { AuthToken, User, UserDto } from "tweeter-shared";
import { Service } from "./Service";
import { ServerFacade } from "./ServerFacade";

export class FollowService implements Service {
  private server = new ServerFacade();
  public async loadMoreFollowees(
    authToken: AuthToken,
    userAlias: string,
    pageSize: number,
    lastItem: UserDto | null
  ): Promise<[User[], boolean]> {
    return this.server.getMoreFollowees({
      token: authToken.token,
      userAlias: userAlias,
      pageSize: pageSize,
      lastItem: lastItem,
    });
  }

  public async loadMoreFollowers(
    authToken: AuthToken,
    userAlias: string,
    pageSize: number,
    lastItem: UserDto | null
  ): Promise<[User[], boolean]> {
    return this.server.getMoreFollowers({
      token: authToken.token,
      userAlias: userAlias,
      pageSize: pageSize,
      lastItem: lastItem,
    });
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
