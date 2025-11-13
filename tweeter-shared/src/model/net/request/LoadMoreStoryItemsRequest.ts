import { Status } from "../../domain/Status";

export interface LoadMoreStoryItemsRequest {
  token: string;
  userAlias: string;
  pageSize: number;
  lastItem: Status | null;
}
