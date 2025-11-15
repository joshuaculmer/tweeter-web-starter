import { PagedUserItemResponse } from "tweeter-shared";
import { PagedUserItemRequest } from "tweeter-shared/src/model/net/request/PagedUserItemRequest";
import { FollowService } from "../../model/service/FollowService";

export const handler = async (
  request: PagedUserItemRequest
): Promise<PagedUserItemResponse> => {
  const followService = new FollowService();
  return followService.loadMoreFollowers(
    request.token,
    request.userAlias,
    request.pageSize,
    request.lastItem
  );
};
