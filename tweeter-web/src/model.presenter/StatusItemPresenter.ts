import { AuthToken, User, Status } from "tweeter-shared";
import { UserService } from "../model.service/UserService";
import { Presenter, View } from "./Presenter";

export interface StatusItemView extends View {
  addItems: (newItems: Status[]) => void;
}

export abstract class StatusItemPresenter extends Presenter<StatusItemView> {
  private userService: UserService;
  private _hasMoreItems = true;
  private _lastItem: Status | null = null;

  protected constructor(view: StatusItemView) {
    super(view);
    this.userService = new UserService();
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
