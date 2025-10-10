import { AuthToken, User } from "tweeter-shared";
import { UserService } from "../model.service/UserService";
import { useMessageActions } from "../components/toaster/messagehooks";

export interface UserInfoView {
  setIsFollower: (value: boolean) => void;
  setFolloweeCount: (value: number) => void;
}

export class UserInfoPresenter {
  private userService: UserService;
  private _view;
  private useMessageAct = useMessageActions();

  public constructor(view: UserInfoView) {
    this.userService = new UserService();
    this._view = view;
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

  public async setIsFollowerStatus(
    authToken: AuthToken,
    currentUser: User,
    displayedUser: User
  ) {
    try {
      if (currentUser === displayedUser) {
        this._view.setIsFollower(false);
      } else {
        this._view.setIsFollower(
          await this.getIsFollowerStatus(
            authToken!,
            currentUser!,
            displayedUser!
          )
        );
      }
    } catch (error) {
      this.useMessageAct.displayErrorMessage(
        `Failed to determine follower status because of exception: ${error}`
      );
    }
  }

  public async setNumbFollowees(authToken: AuthToken, displayedUser: User) {
    try {
      this._view.setFolloweeCount(
        await this.getFolloweeCount(authToken, displayedUser)
      );
    } catch (error) {
      this.useMessageAct.displayErrorMessage(
        `Failed to get followees count because of exception: ${error}`
      );
    }
  }

  public async unfollow(
    authToken: AuthToken,
    userToUnfollow: User
  ): Promise<[followerCount: number, followeeCount: number]> {
    // Pause so we can see the unfollow message. Remove when connected to the server
    await new Promise((f) => setTimeout(f, 2000));

    // TODO: Call the server

    const followerCount = await this.getFollowerCount(
      authToken,
      userToUnfollow
    );
    const followeeCount = await this.getFolloweeCount(
      authToken,
      userToUnfollow
    );

    return [followerCount, followeeCount];
  }

  public async follow(
    authToken: AuthToken,
    userToFollow: User
  ): Promise<[followerCount: number, followeeCount: number]> {
    // Pause so we can see the follow message. Remove when connected to the server
    await new Promise((f) => setTimeout(f, 2000));

    // TODO: Call the server

    const followerCount = await this.getFollowerCount(authToken, userToFollow);
    const followeeCount = await this.getFolloweeCount(authToken, userToFollow);

    return [followerCount, followeeCount];
  }
}
