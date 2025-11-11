import { PagedUserItemResponse } from "tweeter-shared";
import { PagedUserItemRequest } from "tweeter-shared/src/model/net/request/PagedUserItemRequest";
import { FollowService } from "../../model/service/FollowService";

export const handler = async (
  request: PagedUserItemRequest
): Promise<PagedUserItemResponse> => {
  const followService = new FollowService();
  const [items, hasMore] = await followService.loadMoreFollowees(
    request.token,
    request.userAlias,
    request.pageSize,
    request.lastItem
  );

  return {
    success: true,
    message: null,
    items: items,
    hasMore: hasMore,
  };
};
