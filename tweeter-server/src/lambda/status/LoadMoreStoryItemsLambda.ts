import {
  Status,
  LoadMoreStoryItemsRequest,
  PagedStatusItemResponse,
} from "tweeter-shared";
import { StatusService } from "../../model/service/StatusService";
import { tryCatchWrapper } from "../LambdaHelper";
import { FakeDataStatusDAO } from "../../model/dao/FakeDataDao/FakeStatusDAO";
import { StatusDAO } from "../../model/dao/StatusDAO";

const statusdao: StatusDAO = new FakeDataStatusDAO();
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
