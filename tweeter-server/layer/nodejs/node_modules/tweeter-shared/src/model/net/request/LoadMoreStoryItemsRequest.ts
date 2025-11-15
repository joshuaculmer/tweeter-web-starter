import { Status } from "../../domain/Status";
import { TweeterRequest } from "./TweeterRequest";

export interface LoadMoreStoryItemsRequest extends TweeterRequest {
  token: string;
  userAlias: string;
  pageSize: number;
  lastItem: Status | null;
}
