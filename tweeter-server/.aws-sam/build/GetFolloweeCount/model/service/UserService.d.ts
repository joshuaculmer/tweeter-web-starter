import { TweeterResponse, NumberResponse, UserResponse, BooleanResponse, GetIsFollowerRequest, FollowRequest, GetIsFolloweeRequest, GetUserRequest, UnfollowRequest } from "tweeter-shared";
export declare class UserService {
    getUser(request: GetUserRequest): Promise<UserResponse>;
    getIsFollowerStatus(request: GetIsFollowerRequest): Promise<BooleanResponse>;
    getFolloweeCount(request: GetIsFolloweeRequest): Promise<NumberResponse>;
    getFollowerCount(request: GetIsFollowerRequest): Promise<NumberResponse>;
    unfollow(request: UnfollowRequest): Promise<TweeterResponse>;
    follow(request: FollowRequest): Promise<TweeterResponse>;
}
//# sourceMappingURL=UserService.d.ts.map