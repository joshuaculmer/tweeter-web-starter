import { AuthToken, Status } from "tweeter-shared";
import { StatusItemPresenter, StatusItemView } from "./StatusItemPresenter";
import { StatusService } from "../model.service/StatusService";

const PAGE_SIZE = 10;

export class StoryPresenter extends StatusItemPresenter {
  private statusService: StatusService;

  public constructor(view: StatusItemView) {
    super(view);
    this.statusService = new StatusService();
  }
  public async loadMoreItems(authToken: AuthToken, alias: string) {
    await this.doFailureReportingOperations(async () => {
      const [newItems, hasMore] = await this.statusService.loadMoreStoryItems(
        authToken!,
        alias,
        PAGE_SIZE,
        this.lastItem
      );
      this.hasMoreItems = hasMore;

      this.lastItem =
        newItems.length > 0 ? newItems[newItems.length - 1] : null;
      this.view.addItems(newItems);
    }, "load feed story");

    return;
  }
}
