import { Status, LoadMoreFeedItemsRequest } from "tweeter-shared";
import { StatusService } from "../../model/service/StatusService";

export const handler = async (
  request: LoadMoreFeedItemsRequest
): Promise<[Status[], boolean]> => {
  const statusService = new StatusService();
  return statusService.loadMoreFeedItems(
    request.token,
    request.userAlias,
    request.pageSize,
    request.lastItem
  );
};
