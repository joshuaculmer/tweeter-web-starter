import {
  Status,
  LoadMoreFeedItemsRequest,
  PagedStatusItemResponse,
} from "tweeter-shared";
import { StatusService } from "../../model/service/StatusService";
import { tryCatchWrapper } from "../LambdaHelper";
import { StatusDAO } from "../../model/dao/StatusDAO";
import { DynamoStatusDAO } from "../../model/dao/DynamoDao/DynamoStatusDAO";

const statusdao: StatusDAO = new DynamoStatusDAO();
export const handler = async (
  request: LoadMoreFeedItemsRequest
): Promise<PagedStatusItemResponse> => {
  const statusService = new StatusService(statusdao);
  return await tryCatchWrapper(
    statusService.loadMoreFeedItems,
    request,
    "Load More Feed Items Lambda"
  );
};
