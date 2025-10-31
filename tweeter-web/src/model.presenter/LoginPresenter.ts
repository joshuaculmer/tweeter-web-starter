import { User, AuthToken } from "tweeter-shared";
import { AuthService } from "../model.service/AuthService";

import { AuthPresenter, AuthView } from "./AuthPresenter";

export interface LoginView extends AuthView {
  originalUrl: string | undefined;
  alias: string;
  navigate: (path: string) => void;
}
export class LoginPresenter extends AuthPresenter<LoginView> {
  public constructor(view: LoginView) {
    super(view);
  }

  public async login(
    alias: string,
    password: string
  ): Promise<[User, AuthToken]> {
    return new AuthService().login(alias, password);
  }

  public async doLogin(alias: string, password: string, rememberMe: boolean) {
    await this.doUserAuthenticationAction(
      rememberMe,
      "log user in",
      this.login(alias, password)
    );

    if (!!this.view.originalUrl && this.view.originalUrl != "/") {
      this.view.navigate(this.view.originalUrl);
    } else {
      this.view.navigate(`/feed/${alias}`);
    }
  }

  public checkSubmitButtonStatus(alias: string, password: string): boolean {
    return super.checkSubmitButtonStatus(alias, password);
  }
}
