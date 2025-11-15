import {
  Status,
  LoadMoreFeedItemsRequest,
  PagedStatusItemResponse,
} from "tweeter-shared";
import { StatusService } from "../../model/service/StatusService";
import { tryCatchWrapper } from "../LambdaHelper";

export const handler = async (
  request: LoadMoreFeedItemsRequest
): Promise<PagedStatusItemResponse> => {
  const statusService = new StatusService();
  return await tryCatchWrapper(
    statusService.loadMoreFeedItems,
    request,
    "Load More Feed Items Lambda"
  );
};
