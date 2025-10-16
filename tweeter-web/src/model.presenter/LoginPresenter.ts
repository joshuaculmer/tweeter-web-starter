import { User, AuthToken } from "tweeter-shared";
import { AuthService } from "../model.service/AuthService";
import { useNavigate } from "react-router-dom";
import { Presenter, View } from "./Presenter";

export interface LoginView extends View {
  setIsLoading: (value: boolean) => void;
  updateUserInfo: (
    currentUser: User,
    displayedUser: User,
    authToken: AuthToken,
    rememberMe: boolean
  ) => void;
  originalUrl: string | undefined;
}
export class LoginPresenter extends Presenter<LoginView> {
  private navigate = useNavigate();
  public constructor(view: LoginView) {
    super(view);
  }

  public async login(
    alias: string,
    password: string
  ): Promise<[User, AuthToken]> {
    // TODO replace service call with presenter call
    return new AuthService().login(alias, password);
  }

  public async doLogin(alias: string, password: string, rememberMe: boolean) {
    await this.doFailureReportingOperations(async () => {
      this.view.setIsLoading(true);

      const [user, authToken] = await this.login(alias, password);

      this.view.updateUserInfo(user, user, authToken, rememberMe);

      if (!!this.view.originalUrl) {
        this.navigate(this.view.originalUrl);
      } else {
        this.navigate(`/feed/${user.alias}`);
      }
    }, "log user in");

    this.view.setIsLoading(false);
  }

  public checkSubmitButtonStatus(alias: string, password: string): boolean {
    return !alias || !password;
  }
}
