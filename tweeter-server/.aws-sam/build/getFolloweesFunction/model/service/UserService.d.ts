import { UserDto, TweeterResponse, NumberResponse, UserResponse, BooleanResponse } from "tweeter-shared";
export declare class UserService {
    getUser(token: string, alias: string): Promise<UserResponse>;
    getIsFollowerStatus(token: string, user: UserDto, selectedUser: UserDto): Promise<BooleanResponse>;
    getFolloweeCount(token: string, user: UserDto): Promise<NumberResponse>;
    getFollowerCount(token: string, user: UserDto): Promise<NumberResponse>;
    unfollow(token: string, userToUnfollow: UserDto): Promise<TweeterResponse>;
    follow(token: string, userToFollow: UserDto): Promise<TweeterResponse>;
}
//# sourceMappingURL=UserService.d.ts.map