import { Status } from "../../domain/Status";
import { StatusDto } from "../../dto/StatusDto";
import { TweeterRequest } from "./TweeterRequest";

export interface LoadMoreStoryItemsRequest extends TweeterRequest {
  token: string;
  userAlias: string;
  pageSize: number;
  lastItem: StatusDto | null;
}
