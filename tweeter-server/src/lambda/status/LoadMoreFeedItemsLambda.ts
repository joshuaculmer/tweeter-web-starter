import {
  Status,
  LoadMoreFeedItemsRequest,
  PagedStatusItemResponse,
} from "tweeter-shared";
import { StatusService } from "../../model/service/StatusService";
import { tryCatchWrapper } from "../LambdaHelper";
import { FakeDataStatusDAO } from "../../model/dao/FakeDataDao/FakeStatusDAO";

const statusdao = new FakeDataStatusDAO();
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
