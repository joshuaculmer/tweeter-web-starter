import { AuthToken } from "tweeter-shared";
import { FollowService } from "../model.service/FollowService";
import { UserItemPresenter, UserItemView } from "./UserItemPresenter";

export const PAGE_SIZE = 10;

export class FolloweePresenter extends UserItemPresenter {
  private followService: FollowService;

  constructor(view: UserItemView) {
    super(view);
    this.followService = new FollowService();
  }

  public async loadMoreItems(authToken: AuthToken, alias: string) {
    await this.doFailureReportingOperations(async () => {
      const [newItems, hasMore] = await this.followService.loadMoreFollowees(
        authToken,
        alias,
        PAGE_SIZE,
        this.lastItem
      );

      this.hasMoreItems = hasMore;
      this.lastItem =
        newItems.length > 0 ? newItems[newItems.length - 1] : null;
      this.view.addItems(newItems);
    }, "load followees");
  }
}
