import { AuthToken } from "tweeter-shared";
import { useMessageActions } from "../components/toaster/messagehooks";
import { useNavigate } from "react-router-dom";
import { useUserInfoActions } from "../components/userInfo/UserInfoContexts";

export class AppNavbarPresenter {
  private useMessageAct = useMessageActions();
  private useUserInfoAct = useUserInfoActions();
  private navigate = useNavigate();

  private logout = async (authToken: AuthToken | null): Promise<void> => {
    // Pause so we can see the logging out message. Delete when the call to the server is implemented.
    await new Promise((res) => setTimeout(res, 1000));
  };

  public async logOut(authToken: AuthToken | null) {
    const loggingOutToastId = this.useMessageAct.displayInfoMessage(
      "Logging Out...",
      0
    );

    try {
      await this.logout(authToken!);

      this.useMessageAct.deleteMessage(loggingOutToastId);
      this.useUserInfoAct.clearUserInfo();
      this.navigate("/login");
    } catch (error) {
      this.useMessageAct.displayErrorMessage(
        `Failed to log user out because of exception: ${error}`
      );
    }
  }
}
