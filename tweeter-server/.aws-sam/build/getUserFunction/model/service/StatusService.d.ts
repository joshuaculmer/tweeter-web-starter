import { Status, PagedStatusItemResponse, TweeterResponse } from "tweeter-shared";
export declare class StatusService {
    loadMoreFeedItems(token: string, userAlias: string, pageSize: number, lastItem: Status | null): Promise<PagedStatusItemResponse>;
    loadMoreStoryItems(token: string, userAlias: string, pageSize: number, lastItem: Status | null): Promise<PagedStatusItemResponse>;
    postStatus(token: string, newStatus: string): Promise<TweeterResponse>;
}
//# sourceMappingURL=StatusService.d.ts.map