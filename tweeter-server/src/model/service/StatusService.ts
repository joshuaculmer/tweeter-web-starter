import {
  AuthToken,
  Status,
  FakeData,
  PagedStatusItemResponse,
  TweeterResponse,
  LoadMoreFeedItemsRequest,
  LoadMoreStoryItemsRequest,
  PostStatusRequest,
} from "tweeter-shared";

export class StatusService {
  public async loadMoreFeedItems(
    request: LoadMoreFeedItemsRequest
  ): Promise<PagedStatusItemResponse> {
    // TODO: Replace with the result of calling server
    const [items, hasMore] = FakeData.instance.getPageOfStatuses(
      request.lastItem,
      request.pageSize
    );
    return {
      items: items,
      hasMore: hasMore,
      success: true,
      message: "Fetched feed data successfully",
    };
  }

  public async loadMoreStoryItems(
    request: LoadMoreStoryItemsRequest
  ): Promise<PagedStatusItemResponse> {
    // TODO: Replace with the result of calling server
    const [items, hasMore] = FakeData.instance.getPageOfStatuses(
      request.lastItem,
      request.pageSize
    );
    return {
      items: items,
      hasMore: hasMore,
      success: true,
      message: "Fetched story data successfully",
    };
  }

  public async postStatus(
    request: PostStatusRequest
  ): Promise<TweeterResponse> {
    // Pause so we can see the logging out message. Remove when connected to the server
    await new Promise((f) => setTimeout(f, 2000));
    // TODO: Call the server to post the status
    return { success: true, message: "Status posted successfully" };
  }
}
