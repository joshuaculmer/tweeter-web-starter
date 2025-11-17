import { TweeterResponse, NumberResponse, UserResponse, BooleanResponse, GetIsFollowerRequest, FollowRequest, GetUserRequest, UnfollowRequest, GetFollowerCountRequest, GetFolloweeCountRequest } from "tweeter-shared";
export declare class UserService {
    getUser(request: GetUserRequest): Promise<UserResponse>;
    getIsFollowerStatus(request: GetIsFollowerRequest): Promise<BooleanResponse>;
    getFolloweeCount(request: GetFolloweeCountRequest): Promise<NumberResponse>;
    getFollowerCount(request: GetFollowerCountRequest): Promise<NumberResponse>;
    unfollow(request: UnfollowRequest): Promise<TweeterResponse>;
    follow(request: FollowRequest): Promise<TweeterResponse>;
}
//# sourceMappingURL=UserService.d.ts.map