import {
  AuthToken,
  User,
  FakeData,
  UserDto,
  PagedUserItemResponse,
  PagedUserItemRequest,
} from "tweeter-shared";

export class FollowService {
  public async loadMoreFollowees(
    request: PagedUserItemRequest
  ): Promise<PagedUserItemResponse> {
    return await this.getFakeData(
      request.lastItem,
      request.pageSize,
      request.userAlias
    );
  }

  public async loadMoreFollowers(
    request: PagedUserItemRequest
  ): Promise<PagedUserItemResponse> {
    // TODO: Replace with the result of calling server
    return await this.getFakeData(
      request.lastItem,
      request.pageSize,
      request.userAlias
    );
  }

  private async getFakeData(
    lastItem: UserDto | null,
    pageSize: number,
    userAlias: string
  ): Promise<PagedUserItemResponse> {
    const [items, hasMore] = FakeData.instance.getPageOfUsers(
      User.fromDto(lastItem),
      pageSize,
      userAlias
    );
    const dtos = items.map((user) => user.dto);
    return {
      items: dtos,
      hasMore: hasMore,
      success: true,
      message: "Fetched follow data successfully",
    };
  }
}
