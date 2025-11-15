import { PagedUserItemResponse, PagedUserItemRequest } from "tweeter-shared";
export declare class FollowService {
    loadMoreFollowees(request: PagedUserItemRequest): Promise<PagedUserItemResponse>;
    loadMoreFollowers(request: PagedUserItemRequest): Promise<PagedUserItemResponse>;
    private getFakeData;
}
//# sourceMappingURL=FollowService.d.ts.map