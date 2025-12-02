import { PagedUserItemResponse } from "tweeter-shared";
import { PagedUserItemRequest } from "tweeter-shared/src/model/net/request/PagedUserItemRequest";
import { FollowService } from "../../model/service/FollowService";
import { tryCatchWrapper } from "../LambdaHelper";
import { DynamoFollowDAO } from "../../model/dao/DynamoDao/DynamoFollowDAO";
const followDao = new DynamoFollowDAO();
export const handler = async (
  request: PagedUserItemRequest
): Promise<PagedUserItemResponse> => {
  const followService = new FollowService(followDao);
  return await tryCatchWrapper(
    followService.loadMoreFollowees,
    request,
    "Get Followees Lambda"
  );
};
