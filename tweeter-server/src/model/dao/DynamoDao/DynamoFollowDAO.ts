import { UserDto } from "tweeter-shared";
import { FollowDAO } from "../FollowDAO";

export class DynamoFollowDAO implements FollowDAO{
    LoadMoreFollowers(token: string, userAlias: string, pageSize: number, lastItem: UserDto | null): Promise<[UserDto[], boolean]> {
        throw new Error("Method not implemented.");
    }
    LoadMoreFollowees(token: string, userAlias: string, pageSize: number, lastItem: UserDto | null): Promise<[UserDto[], boolean]> {
        throw new Error("Method not implemented.");
    }
    GetIsFollowerStatus(token: string, user: UserDto, selectedUser: UserDto): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    GetFollowerCount(alias: string): Promise<number> {
        throw new Error("Method not implemented.");
    }
    GetFolloweeCount(alias: string): Promise<number> {
        throw new Error("Method not implemented.");
    }
    Follow(token: string, userToFollow: UserDto): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    Unfollow(token: string, userToFollow: UserDto): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}