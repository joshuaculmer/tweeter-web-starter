import { User, AuthToken } from "tweeter-shared";
import { AuthService } from "../model.service/AuthService";
import { useUserInfoActions } from "../components/userInfo/UserInfoContexts";

export interface LoginView {
  setIsLoading: (value: boolean) => void;
  displayErrorMessage: (value: string) => void;
  updateUserInfo: (
    currentUser: User,
    displayedUser: User,
    authToken: AuthToken,
    rememberMe: boolean
  ) => void;
  navigate: (url: string) => void;
  originalUrl: string | undefined;
}
export class LoginPresenter {
  private view: LoginView;
  public constructor(view: LoginView) {
    this.view = view;
  }

  public async login(
    alias: string,
    password: string
  ): Promise<[User, AuthToken]> {
    // TODO replace service call with presenter call
    return new AuthService().login(alias, password);
  }

  public async doLogin(alias: string, password: string, rememberMe: boolean) {
    try {
      this.view.setIsLoading(true);

      const [user, authToken] = await this.login(alias, password);

      this.view.updateUserInfo(user, user, authToken, rememberMe);

      if (!!this.view.originalUrl) {
        this.view.navigate(this.view.originalUrl);
      } else {
        this.view.navigate(`/feed/${user.alias}`);
      }
    } catch (error) {
      this.view.displayErrorMessage(
        `Failed to log user in because of exception: ${error}`
      );
    } finally {
      this.view.setIsLoading(false);
    }
  }

  public checkSubmitButtonStatus(alias: string, password: string): boolean {
    return !alias || !password;
  }
}
