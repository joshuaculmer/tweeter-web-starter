import { Status } from "../../domain/Status";

export interface LoadMoreFeedItemsRequest {
  token: string;
  userAlias: string;
  pageSize: number;
  lastItem: Status | null;
}
