import { AuthToken } from "tweeter-shared";
import { useMessageActions } from "./messagehooks";
import { useNavigate } from "react-router-dom";
import { useUserInfoActions } from "./UserInfoContexts";
import { AuthService } from "../model.service/AuthService";
import { MessageView, Presenter } from "./Presenter";

export interface AppNavbarView extends MessageView {
  clearUserInfo: () => void;
  navigateToLogin: () => void;
}

export class AppNavbarPresenter extends Presenter<AppNavbarView> {
  private useMessageAct = useMessageActions();
  private useUserInfoAct = useUserInfoActions();
  private navigate = useNavigate();
  private service;

  public constructor(view: AppNavbarView) {
    super(view);
    this.service = new AuthService();
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
      
      this.navigate("/login");
    }, "log user out");
  }
}
