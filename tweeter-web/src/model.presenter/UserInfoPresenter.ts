import { AuthToken, User } from "tweeter-shared";
import { UserService } from "../model.service/UserService";
import { useMessageActions } from "./messagehooks";
import { Presenter, View } from "./Presenter";

export interface UserInfoView extends View {
  setIsFollower: (value: boolean) => void;
  setFolloweeCount: (value: number) => void;
  setFollowerCount: (value: number) => void;
  setIsLoading: (value: boolean) => void;
}

export class UserInfoPresenter extends Presenter<UserInfoView> {
  private userService: UserService;
  private useMessageAct = useMessageActions();

  public constructor(view: UserInfoView) {
    super(view);
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

  public async setIsFollowerStatus(
    authToken: AuthToken,
    currentUser: User,
    displayedUser: User
  ) {
    await this.doFailureReportingOperations(async () => {
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
    }, "determine follower status");
  }

  public async setNumbFollowees(authToken: AuthToken, displayedUser: User) {
    await this.doFailureReportingOperations(async () => {
      this._view.setFolloweeCount(
        await this.getFolloweeCount(authToken, displayedUser)
      );
    }, "get followees count");
  }

  public async unfollow(
    authToken: AuthToken,
    userToUnfollow: User
  ): Promise<[followerCount: number, followeeCount: number]> {
    await this.userService.unfollow(authToken, userToUnfollow);

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
    await this.userService.follow(authToken, userToFollow);

    const followerCount = await this.getFollowerCount(authToken, userToFollow);
    const followeeCount = await this.getFolloweeCount(authToken, userToFollow);

    return [followerCount, followeeCount];
  }

  public async setNumbFollowers(authToken: AuthToken, displayedUser: User) {
    await this.doFailureReportingOperations(async () => {
      this._view.setFollowerCount(
        await this.getFollowerCount(authToken, displayedUser)
      );
    }, "get followers count");
  }

  public async followDisplayedUser(
    event: React.MouseEvent,
    authToken: AuthToken | null,
    displayedUser: User | null
  ): Promise<void> {
    event.preventDefault();
    var followingUserToast = "";

    await this.doFailureReportingOperations(async () => {
      this._view.setIsLoading(true);
      followingUserToast = this.useMessageAct.displayInfoMessage(
        `Following ${displayedUser!.name}...`,
        0
      );

      const [followerCount, followeeCount] = await this.follow(
        authToken!,
        displayedUser!
      );

      this._view.setIsFollower(true);
      this._view.setFollowerCount(followerCount);
      this._view.setFolloweeCount(followeeCount);
    }, "follow user");

    this.useMessageAct.deleteMessage(followingUserToast);
    this._view.setIsLoading(false);
  }

  public async unfollowDisplayedUser(
    event: React.MouseEvent,
    authToken: AuthToken | null,
    displayedUser: User | null
  ): Promise<void> {
    event.preventDefault();

    var unfollowingUserToast = "";

    await this.doFailureReportingOperations(async () => {
      this._view.setIsLoading(true);
      unfollowingUserToast = this.useMessageAct.displayInfoMessage(
        `Unfollowing ${displayedUser!.name}...`,
        0
      );

      const [followerCount, followeeCount] = await this.unfollow(
        authToken!,
        displayedUser!
      );

      this._view.setIsFollower(false);
      this._view.setFollowerCount(followerCount);
      this._view.setFolloweeCount(followeeCount);
    }, "unfollow user");

    this.useMessageAct.deleteMessage(unfollowingUserToast);
    this._view.setIsLoading(false);
  }
}
