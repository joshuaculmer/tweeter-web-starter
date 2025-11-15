import {
  Status,
  LoadMoreFeedItemsRequest,
  PagedStatusItemResponse,
} from "tweeter-shared";
import { StatusService } from "../../model/service/StatusService";

export const handler = async (
  request: LoadMoreFeedItemsRequest
): Promise<PagedStatusItemResponse> => {
  const statusService = new StatusService();
  return statusService.loadMoreFeedItems(
    request.token,
    request.userAlias,
    request.pageSize,
    request.lastItem
  );
};
