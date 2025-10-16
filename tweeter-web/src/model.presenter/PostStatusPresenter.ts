import { AuthToken, Status, User } from "tweeter-shared";
import { useMessageActions } from "./messagehooks";

export interface PostStatusView {
  setIsLoading: (value: boolean) => void;
  setPost: (value: string) => void;
}

export class PostStatusPresenter {
  private useMessageAct = useMessageActions();
  private _view: PostStatusView;
  public constructor(view: PostStatusView) {
    this._view = view;
  }

  public async postStatus(
    authToken: AuthToken,
    newStatus: Status
  ): Promise<void> {
    // Pause so we can see the logging out message. Remove when connected to the server
    await new Promise((f) => setTimeout(f, 2000));
    // TODO: Call the server to post the status
  }

  public async submitPost(
    authToken: AuthToken | null,
    post: string,
    currentUser: User | null
  ) {
    var postingStatusToastId = "";

    try {
      this._view.setIsLoading(true);
      postingStatusToastId = this.useMessageAct.displayInfoMessage(
        "Posting status...",
        0
      );

      const status = new Status(post, currentUser!, Date.now());
      await this.postStatus(authToken!, status);

      this._view.setPost("");
      this.useMessageAct.displayInfoMessage!("Status posted!", 2000);
    } catch (error) {
      this.useMessageAct.displayErrorMessage(
        `Failed to post the status because of exception: ${error}`
      );
    } finally {
      this.useMessageAct.deleteMessage(postingStatusToastId);
      this._view.setIsLoading(false);
    }
  }
}
