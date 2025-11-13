import { Status } from "tweeter-shared";
export declare class StatusService {
    loadMoreFeedItems(token: string, userAlias: string, pageSize: number, lastItem: Status | null): Promise<[Status[], boolean]>;
    loadMoreStoryItems(token: string, userAlias: string, pageSize: number, lastItem: Status | null): Promise<[Status[], boolean]>;
    postStatus(token: string, newStatus: string): Promise<void>;
}
//# sourceMappingURL=StatusService.d.ts.map