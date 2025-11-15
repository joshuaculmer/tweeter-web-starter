import { UserDto, PagedUserItemResponse } from "tweeter-shared";
export declare class FollowService {
    loadMoreFollowees(token: string, userAlias: string, pageSize: number, lastItem: UserDto | null): Promise<PagedUserItemResponse>;
    loadMoreFollowers(token: string, userAlias: string, pageSize: number, lastItem: UserDto | null): Promise<PagedUserItemResponse>;
    private getFakeData;
}
//# sourceMappingURL=FollowService.d.ts.map