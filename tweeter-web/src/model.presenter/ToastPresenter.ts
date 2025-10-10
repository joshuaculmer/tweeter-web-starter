import { useMessageActions, useMessageList } from "./messagehooks";

export class ToastPresenter {
  private messageList = useMessageList();
  private useMessageAct = useMessageActions();

  public deleteExpiredToasts() {
    const now = Date.now();

    for (let toast of this.messageList) {
      if (
        toast.expirationMillisecond > 0 &&
        toast.expirationMillisecond < now
      ) {
        this.useMessageAct.deleteMessage(toast.id);
      }
    }
  }
}
