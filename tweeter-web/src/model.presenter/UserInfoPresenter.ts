import { AuthToken, User, FakeData } from "tweeter-shared";
import { UserService } from "../model.service/UserService";

export interface UserInfoView {}

export class UserInfoPresenter {
  private userService: UserService;
  public constructor() {
    this.userService = new UserService();
  }

  public async getIsFollowerStatus(
    authToken: AuthToken,
    user: User,
    selectedUser: User
  ): Promise<boolean> {
    return this.userService.getIsFollowerStatus(authToken, user, selectedUser);
  }

  public async getFolloweeCount(
    authToken: AuthToken,
    user: User
  ): Promise<number> {
    return this.userService.getFolloweeCount(authToken, user);
  }

  public async getFollowerCount(
    authToken: AuthToken,
    user: User
  ): Promise<number> {
    return this.userService.getFollowerCount(authToken, user);
  }
}
