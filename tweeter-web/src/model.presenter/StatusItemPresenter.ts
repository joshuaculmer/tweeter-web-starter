import { AuthToken, User, Status } from "tweeter-shared";
// import { StatusService } from "../model.service/StatusService";
import { UserService } from "../model.service/UserService";

export interface StatusItemView {
  addItems: (newItems: Status[]) => void;
  displayErrorMessage: (message: string) => void;
}

export abstract class StatusItemPresenter {
  private userService: UserService;
  private _hasMoreItems = true;
  private _lastItem: Status | null = null;
  private _view: StatusItemView;

  protected constructor(view: StatusItemView) {
    this.userService = new UserService();
    this._view = view;
  }

  protected get view() {
    return this._view;
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

  getUser = async (
    authToken: AuthToken,
    alias: string
  ): Promise<User | null> => {
    return this.userService.getUser(authToken, alias);
  };

  public abstract loadMoreItems(authToken: AuthToken, alias: string): void;

  //   public loadMoreItems() {
  // THIS IS THE LOGIC AS CONTAINED INTHE STATUS ITEM SCROLLER
  // try {
  //   const [newItems, hasMore] = await props.loadMore(
  //     authToken!,
  //     displayedUser!.alias,
  //     PAGE_SIZE,
  //     lastItem
  //   );
  //   setHasMoreItems(() => hasMore);
  //   setLastItem(() => newItems[newItems.length - 1]);
  //   addItems(newItems);
  // } catch (error) {
  //   displayErrorMessage(
  //     `Failed to load ${props.itemDescription} because of exception: ${error}`
  //   );
  // }
  //   }

  public reset() {
    this._hasMoreItems = true;
    this._lastItem = null;
  }
}
