import {
  Status,
  LoadMoreStoryItemsRequest,
  PagedStatusItemResponse,
} from "tweeter-shared";
import { StatusService } from "../../model/service/StatusService";

export const hanlder = async (
  request: LoadMoreStoryItemsRequest
): Promise<PagedStatusItemResponse> => {
  const statusService = new StatusService();
  return statusService.loadMoreStoryItems(
    request.token,
    request.userAlias,
    request.pageSize,
    request.lastItem
  );
};
