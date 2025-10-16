import { AuthToken, User } from "tweeter-shared";
import { UserService } from "../model.service/UserService";
import { Presenter, View } from "./Presenter";
import { Service } from "../model.service/Service";

export interface PagedItemView<T> extends View {
  addItems: (newItems: T[]) => void;
}
export const PAGE_SIZE = 10;

// This class replaces the Follower, Followee, Feed, and Story item presentesr
export abstract class PagedItemPresenter<
  T,
  U extends Service
> extends Presenter<PagedItemView<T>> {
  private _hasMoreItems = true;
  private _lastItem: T | null = null;
  private userService: UserService = new UserService();
  private _service: U;
  // RIGHT HERE

  public constructor(view: PagedItemView<T>) {
    super(view);
    this._service = this.serviceFactory();
  }

  protected abstract serviceFactory(): U;

  protected get service() {
    return this._service;
  }
  protected get lastItem() {
    return this._lastItem;
  }

  protected set lastItem(value) {
    this._lastItem = value;
  }

  public get hasMoreItems() {
    return this._hasMoreItems;
  }

  protected set hasMoreItems(value: boolean) {
    this._hasMoreItems = value;
  }

  public reset() {
    this._hasMoreItems = true;
    this._lastItem = null;
  }

  // template method pattern
  public async loadMoreItems(authToken: AuthToken, alias: string) {
    await this.doFailureReportingOperations(async () => {
      const [newItems, hasMore] = await this.getMoreItems(authToken, alias);

      this.hasMoreItems = hasMore;
      this.lastItem =
        newItems.length > 0 ? newItems[newItems.length - 1] : null;
      this.view.addItems(newItems);
    }, this.itemDescription());
  }

  protected abstract itemDescription(): string;

  protected abstract getMoreItems(
    authToken: AuthToken,
    userAlias: string
  ): Promise<[T[], boolean]>;

  getUser = async (
    authToken: AuthToken,
    alias: string
  ): Promise<User | null> => {
    return this.userService.getUser(authToken, alias);
  };
}
