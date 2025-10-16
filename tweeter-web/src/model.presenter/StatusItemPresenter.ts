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



  public reset() {
    this._hasMoreItems = true;
    this._lastItem = null;
  }
}
