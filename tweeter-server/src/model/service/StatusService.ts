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
import { StatusDAO } from "../dao/StatusDAO";

export class StatusService {
  private dao: StatusDAO;

  public constructor(dao: StatusDAO) {
    this.dao = dao;
  }

  public async loadMoreFeedItems(
    request: LoadMoreFeedItemsRequest
  ): Promise<PagedStatusItemResponse> {
    const [items, hasMore] = this.dao.LoadMoreStoryItems(
      Status.fromDto(request.lastItem),
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
    const [items, hasMore] = this.dao.LoadMoreStoryItems(
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
    this.dao.PostStatus(request.token, request.newStatus);
    return { success: true, message: "Status posted successfully" };
  }
}
