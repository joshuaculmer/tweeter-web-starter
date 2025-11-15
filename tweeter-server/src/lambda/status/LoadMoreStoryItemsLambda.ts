import {
  Status,
  LoadMoreStoryItemsRequest,
  PagedStatusItemResponse,
} from "tweeter-shared";
import { StatusService } from "../../model/service/StatusService";
import { tryCatchWrapper } from "../LambdaHelper";

export const hanlder = async (
  request: LoadMoreStoryItemsRequest
): Promise<PagedStatusItemResponse> => {
  const statusService = new StatusService();
  return await tryCatchWrapper(
    statusService.loadMoreStoryItems,
    request,
    "Load More Story Items Lambda"
  );
};
