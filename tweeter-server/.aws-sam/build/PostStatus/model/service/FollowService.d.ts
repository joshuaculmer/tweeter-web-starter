import { UserDto } from "tweeter-shared";
export declare class FollowService {
    loadMoreFollowees(token: string, userAlias: string, pageSize: number, lastItem: UserDto | null): Promise<[UserDto[], boolean]>;
    loadMoreFollowers(token: string, userAlias: string, pageSize: number, lastItem: UserDto | null): Promise<[UserDto[], boolean]>;
    private getFakeData;
}
//# sourceMappingURL=FollowService.d.ts.map