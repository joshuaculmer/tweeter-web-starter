import { UserDto } from "tweeter-shared";
export declare class UserService {
    getUser(token: string, alias: string): Promise<UserDto | null>;
    getIsFollowerStatus(token: string, user: UserDto, selectedUser: UserDto): Promise<boolean>;
    getFolloweeCount(token: string, user: UserDto): Promise<number>;
    getFollowerCount(token: string, user: UserDto): Promise<number>;
    unfollow(token: string, userToUnfollow: UserDto): Promise<void>;
    follow(token: string, userToFollow: UserDto): Promise<void>;
}
//# sourceMappingURL=UserService.d.ts.map