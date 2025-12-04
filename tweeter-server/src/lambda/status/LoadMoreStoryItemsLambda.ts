import {
  Status,
  LoadMoreStoryItemsRequest,
  PagedStatusItemResponse,
} from "tweeter-shared";
import { StatusService } from "../../model/service/StatusService";
import { tryCatchWrapper } from "../LambdaHelper";
import { StatusDAO } from "../../model/dao/StatusDAO";
import { DynamoStatusDAO } from "../../model/dao/DynamoDao/DynamoStatusDAO";

const statusdao: StatusDAO = new DynamoStatusDAO();
export const handler = async (
  request: LoadMoreStoryItemsRequest
): Promise<PagedStatusItemResponse> => {
  const statusService = new StatusService(statusdao);
  return await tryCatchWrapper(
    statusService.loadMoreStoryItems,
    request,
    "Load More Story Items Lambda"
  );
};
