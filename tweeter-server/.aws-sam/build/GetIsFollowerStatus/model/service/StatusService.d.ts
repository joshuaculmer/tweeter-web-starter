import { PagedStatusItemResponse, TweeterResponse, LoadMoreFeedItemsRequest, LoadMoreStoryItemsRequest, PostStatusRequest } from "tweeter-shared";
export declare class StatusService {
    loadMoreFeedItems(request: LoadMoreFeedItemsRequest): Promise<PagedStatusItemResponse>;
    loadMoreStoryItems(request: LoadMoreStoryItemsRequest): Promise<PagedStatusItemResponse>;
    postStatus(request: PostStatusRequest): Promise<TweeterResponse>;
}
//# sourceMappingURL=StatusService.d.ts.map