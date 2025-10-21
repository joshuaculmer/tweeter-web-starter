import { AuthToken } from "tweeter-shared";
import { AuthService } from "../model.service/AuthService";
import { MessageView, Presenter } from "./Presenter";

export interface AppNavbarView extends MessageView {
  clearUserInfo: () => void;
  navigateToLogin: () => void;
}

export class AppNavbarPresenter extends Presenter<AppNavbarView> {
  private _service;

  public constructor(view: AppNavbarView) {
    super(view);
    this._service = new AuthService();
  }

  public get service() {
    return this._service;
  }

  public async logOut(authToken: AuthToken | null) {
    this.doFailureReportingOperations(async () => {
      const loggingOutToastId = this._view.displayInfoMessage(
        "Logging Out...",
        0
      );

      await this.service.logout(authToken);

      this._view.deleteMessage(loggingOutToastId);
      this._view.clearUserInfo();

      this._view.navigateToLogin();
    }, "log user out");
  }
}
