import { User, AuthToken } from "tweeter-shared";
import { Presenter, View } from "./Presenter";

export interface AuthView extends View {
  setIsLoading: (value: boolean) => void;
  updateUserInfo: (
    currentUser: User,
    displayedUser: User,
    authToken: AuthToken,
    rememberMe: boolean
  ) => void;
}

export abstract class AuthPresenter<T extends AuthView> extends Presenter<T> {
  public async doUserAuthenticationAction(
    rememberMe: boolean,
    description: string,
    authenticaionResult: Promise<[User, AuthToken]>
  ) {
    await this.doFailureReportingOperations(async () => {
      this.view.setIsLoading(true);

      const [user, authToken] = await authenticaionResult;

      this.view.updateUserInfo(user, user, authToken, rememberMe);
    }, description);

    this.view.setIsLoading(false);
  }

  // returns !arg1 || !arg2 ...
  public checkSubmitButtonStatus(...args: string[]): boolean {
    return args.some(arg => !arg);
  }
}
