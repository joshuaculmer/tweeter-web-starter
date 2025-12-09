import { UserDto, PagedUserItemResponse, FakeData, User } from "tweeter-shared";
import { FollowDAO } from "../FollowDAO";

export class FakeFollowDAO implements FollowDAO {
  async LoadMoreFollowers(
    token: string,
    userAlias: string,
    pageSize: number,
    lastItem: UserDto | null
  ): Promise<[UserDto[], boolean]> {
    const [items, hasMore] = FakeData.instance.getPageOfUsers(
      User.fromDto(lastItem),
      pageSize,
      userAlias
    );
    const dtos = items.map((user) => user.dto);
    return [dtos, hasMore];
  }

  async LoadMoreFollowees(
    token: string,
    userAlias: string,
    pageSize: number,
    lastItem: UserDto | null
  ): Promise<[UserDto[], boolean]> {
    const [items, hasMore] = FakeData.instance.getPageOfUsers(
      User.fromDto(lastItem),
      pageSize,
      userAlias
    );
    const dtos = items.map((user) => user.dto);
    return [dtos, hasMore];
  }

  async GetIsFollowerStatus(
    token: string,
    user: UserDto,
    selectedUser: UserDto
  ): Promise<boolean> {
    const isFollower = await FakeData.instance.isFollower();
    return isFollower;
  }
  async GetFollowerCount(alias: string): Promise<number> {
    const count = await FakeData.instance.getFollowerCount(alias);
    return count;
  }
  async GetFolloweeCount(alias: string): Promise<number> {
    const count = await FakeData.instance.getFolloweeCount(alias);
    return count;
  }

  async Follow(token: string, userToFollow: UserDto): Promise<boolean> {
    await new Promise((f) => setTimeout(f, 500));
    return true;
  }
  async Unfollow(token: string, userToFollow: UserDto): Promise<boolean> {
    await new Promise((f) => setTimeout(f, 500));
    return true;
  }
  async getFollowersUsernames(
    username: string,
    lastFollower: string | undefined
  ): Promise<string[]> {
    return [];
  }
}
