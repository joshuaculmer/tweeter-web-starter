import { AuthToken, Status, User } from "tweeter-shared";
import { StatusService } from "../model.service/StatusService";
import { MessageView, Presenter } from "./Presenter";

export interface PostStatusView extends MessageView {
  setIsLoading: (value: boolean) => void;
  setPost: (value: string) => void;
}

export class PostStatusPresenter extends Presenter<PostStatusView> {
  private _service = new StatusService();

  public constructor(view: PostStatusView) {
    super(view);
  }

  public get service() {
    return this._service;
  }

  public async postStatus(
    authToken: AuthToken | null,
    post: string,
    currentUser: User | null
  ) {
    var postingStatusToastId = "";

    this.view.setIsLoading(true);
    postingStatusToastId = this.view.displayInfoMessage("Posting status...", 0);

    await this.doFailureReportingOperations(async () => {
      await this.service.postStatus(authToken!, post);

      this.view.setPost("");
      this.view.displayInfoMessage!("Status posted!", 2000);
    }, "posting status");

    this.view.deleteMessage(postingStatusToastId);
    this.view.setIsLoading(false);
  }
}
