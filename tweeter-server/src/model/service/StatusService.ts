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

  public loadMoreFeedItems = async (
    request: LoadMoreFeedItemsRequest
  ): Promise<PagedStatusItemResponse> => {
    const [items, hasMore] = await this.dao.LoadMoreFeedItems(
      request.token,
      request.userAlias,
      Status.fromDto(request.lastItem),
      request.pageSize
    );
    return {
      items: items,
      hasMore: hasMore,
      success: true,
      message: "Fetched feed data successfully",
    };
  };

  public loadMoreStoryItems = async (
    request: LoadMoreStoryItemsRequest
  ): Promise<PagedStatusItemResponse> => {
    const [items, hasMore] = await this.dao.LoadMoreStoryItems(
      request.token,
      request.userAlias,
      Status.fromDto(request.lastItem),
      request.pageSize
    );
    return {
      items: items,
      hasMore: hasMore,
      success: true,
      message: "Fetched story data successfully",
    };
  };

  public postStatus = async (
    request: PostStatusRequest
  ): Promise<TweeterResponse> => {
    const result = await this.dao.PostStatus(request.token, request.newStatus);
    if (result) {
      return { success: true, message: "Status posted successfully" };
    } else {
      return { success: false, message: "Could not post status" };
    }
  };
}
