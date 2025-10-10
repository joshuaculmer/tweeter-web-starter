import { AuthToken, User } from "tweeter-shared";
import { UserService } from "../model.service/UserService";
import { useMessageActions } from "./messagehooks";

export interface UserInfoView {
  setIsFollower: (value: boolean) => void;
  setFolloweeCount: (value: number) => void;
  setFollowerCount: (value: number) => void;
  setIsLoading: (value: boolean) => void;
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

  public async setNumbFollowers(authToken: AuthToken, displayedUser: User) {
    try {
      this._view.setFollowerCount(
        await this.getFollowerCount(authToken, displayedUser)
      );
    } catch (error) {
      this.useMessageAct.displayErrorMessage(
        `Failed to get followers count because of exception: ${error}`
      );
    }
  }

  public async followDisplayedUser(
    event: React.MouseEvent,
    authToken: AuthToken | null,
    displayedUser: User | null
  ): Promise<void> {
    event.preventDefault();
    var followingUserToast = "";

    try {
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
    } catch (error) {
      this.useMessageAct.displayErrorMessage(
        `Failed to follow user because of exception: ${error}`
      );
    } finally {
      this.useMessageAct.deleteMessage(followingUserToast);
      this._view.setIsLoading(false);
    }
  }

  public async unfollowDisplayedUser(
    event: React.MouseEvent,
    authToken: AuthToken | null,
    displayedUser: User | null
  ): Promise<void> {
    event.preventDefault();

    var unfollowingUserToast = "";

    try {
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
    } catch (error) {
      this.useMessageAct.displayErrorMessage(
        `Failed to unfollow user because of exception: ${error}`
      );
    } finally {
      this.useMessageAct.deleteMessage(unfollowingUserToast);
      this._view.setIsLoading(false);
    }
  }
}
