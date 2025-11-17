import { PagedUserItemResponse } from "tweeter-shared";
import { PagedUserItemRequest } from "tweeter-shared/src/model/net/request/PagedUserItemRequest";
import { FollowService } from "../../model/service/FollowService";
import { tryCatchWrapper } from "../LambdaHelper";

export const handler = async (
  request: PagedUserItemRequest
): Promise<PagedUserItemResponse> => {
  const followService = new FollowService();
  return await tryCatchWrapper(
    followService.loadMoreFollowers.bind(followService),
    request,
    "Get Followers Lambda"
  );
};
