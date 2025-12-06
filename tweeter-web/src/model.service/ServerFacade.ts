import {
  AuthToken,
  FollowRequest,
  GetIsFollowerRequest,
  GetUserRequest,
  LoadMoreFeedItemsRequest,
  LoadMoreStoryItemsRequest,
  PagedUserItemRequest,
  PagedUserItemResponse,
  RegisterRequest,
  Status,
  User,
  UserDto,
  UserResponse,
} from "tweeter-shared";
import { ClientCommunicator } from "./ClientCommunicator";

export class ServerFacade {
  private SERVER_URL =
    "https://pz9h48d774.execute-api.us-east-1.amazonaws.com/prod";
  private clientCommunicator = new ClientCommunicator(this.SERVER_URL);

  //
  // Api calls for all 14 endpoints
  //
  public async getMoreFollowees(
    request: PagedUserItemRequest
  ): Promise<[User[], boolean]> {
    const response = await this.clientCommunicator.doPost<
      PagedUserItemRequest,
      PagedUserItemResponse
    >(request, "/followees/get"); // change the path here

    // Convert the UserDto array returned by ClientCommunicator to a User array
    const items: User[] | null =
      response.success && response.items
        ? response.items.map((dto) => User.fromDto(dto) as User)
        : null;

    // Handle errors
    if (response.success) {
      if (items == null) {
        throw new Error(`No followees found`);
      } else {
        return [items, response.hasMore];
      }
    } else {
      console.error(response);
      throw new Error(response.message ?? undefined);
    }
  }

  public async getMoreFollowers(
    request: PagedUserItemRequest
  ): Promise<[User[], boolean]> {
    const response = await this.clientCommunicator.doPost<
      PagedUserItemRequest,
      PagedUserItemResponse
    >(request, "/followers/get"); // change the path here
    // Convert the UserDto array returned by ClientCommunicator to a User array
    const items: User[] | null =
      response.success && response.items
        ? response.items.map((dto) => User.fromDto(dto) as User)
        : null;
    // Handle errors
    if (response.success) {
      if (items == null) {
        throw new Error(`No followers found`);
      } else {
        return [items, response.hasMore];
      }
    } else {
      console.error(response);
      throw new Error(response.message ?? undefined);
    }
  }

  public async getUser(authToken: AuthToken, alias: string): Promise<User> {
    const response = await this.clientCommunicator.doPost<
      GetUserRequest,
      UserResponse
    >({ token: authToken.token, userAlias: alias }, "/user/get");
    if (response.success) {
      return User.fromDto(response.user) as User;
    } else {
      console.error(response);
      throw new Error(response.message ?? undefined);
    }
  }
  // npm run test test/service/ServerFacade.test.ts

  public async getIsFollower(
    token: string,
    user: User,
    selectedUser: User
  ): Promise<boolean> {
    const response = await this.clientCommunicator.doPost<
      GetIsFollowerRequest,
      any
    >(
      {
        token: token,
        user: user.dto as UserDto,
        selectedUser: selectedUser.dto as UserDto,
      },
      "/follow/followerstatus/get"
    );
    if (response.success) {
      return response.bool;
    } else {
      console.error(response);
      throw new Error(response.errorMessage ?? undefined);
    }
  }

  public async getFollowerCount(alias: string): Promise<number> {
    const response = await this.clientCommunicator.doPost<any, any>(
      { alias: alias },
      "/follow/followerCount/get"
    );
    return response.Number;
  }

  public async getFolloweeCount(alias: string): Promise<number> {
    console.log("ServerFacade - getFolloweeCount called with alias:", alias);
    const response = await this.clientCommunicator.doPost<any, any>(
      { alias: alias },
      "/follow/followeeCount/get"
    );
    return response.Number;
  }

  public async follow(token: string, selectedUser: User): Promise<void> {
    const response = await this.clientCommunicator.doPost<any, any>(
      {
        token: token,
        userToFollow: selectedUser.dto as UserDto,
      },
      "/follow/follow"
    );

    if (!response.success) {
      console.error(response);
      throw new Error(response.errorMessage ?? "Follow failed");
    }
  }

  public async unfollow(token: string, selectedUser: User): Promise<void> {
    const response = await this.clientCommunicator.doPost<any, any>(
      {
        token: token,
        userToUnfollow: selectedUser.dto as UserDto,
      },
      "/follow/unfollow"
    );

    if (!response.success) {
      console.error(response);
      throw new Error(response.errorMessage ?? "Unfollow failed");
    }
  }

  public async login(
    alias: string,
    password: string
  ): Promise<{ token: AuthToken; user: User }> {
    const response = await this.clientCommunicator.doPost<any, any>(
      { alias: alias, password: password },
      "/auth/login"
    );
    if (response.success) {
      return {
        token: new AuthToken(response.AuthToken._token, Date.now()),
        user: User.fromDto(response.UserDto) as User,
      };
    } else {
      console.error(response);
      throw new Error(response.errorMessage ?? undefined);
    }
  }

  public async logout(token: string): Promise<void> {
    const response = await this.clientCommunicator.doPost<any, any>(
      { token: token },
      "/auth/logout"
    );
    if (!response.success) {
      console.error(response);
      throw new Error(response.errorMessage ?? "Logout failed");
    }
  }

  public async register(
    request: RegisterRequest
  ): Promise<{ token: AuthToken; user: User }> {
    const response = await this.clientCommunicator.doPost<any, any>(
      request,
      "/auth/register"
    );
    if (response.success) {
      return {
        token: response.AuthToken,
        user: User.fromDto(response.UserDto) as User,
      };
    } else {
      console.error(response);
      throw new Error(response.errorMessage ?? undefined);
    }
  }

  public async postStatus(token: string, newStatus: string): Promise<void> {
    const response = await this.clientCommunicator.doPost<any, any>(
      {
        token: token,
        newStatus: newStatus,
      },
      "/status/post"
    );
    if (!response.success) {
      console.error(response);
      throw new Error(response.errorMessage ?? "Post status failed");
    }
  }

  public async loadMoreFeedItems(
    request: LoadMoreFeedItemsRequest
  ): Promise<[Status[], boolean]> {
    if (request.lastItem == null) {
      console.log(
        "last item was set as null by the time it got to serverfacade"
      );
    } else {
      console.log("last item is in fact not null" + request.lastItem.post);
    }
    const response = await this.clientCommunicator.doPost<
      LoadMoreFeedItemsRequest,
      any
    >(request, "/status/loadmorefeeditems");

    // convert status dtos to status objects
    const statusItems: Status[] = response.items.map(
      (StatusDto: any) => Status.fromDto(StatusDto) as Status
    );
    return [statusItems, response.hasMore];
  }

  public async loadMoreStoryItems(
    request: LoadMoreStoryItemsRequest
  ): Promise<[Status[], boolean]> {
    const response = await this.clientCommunicator.doPost<
      LoadMoreStoryItemsRequest,
      any
    >(request, "/status/loadmorestoryitems");

    // convert status dtos to status objects
    console.log("ServerFacade - loadMoreStoryItems response:", response);
    const statusItems: Status[] = response.items.map(
      (StatusDto: any) => Status.fromDto(StatusDto) as Status
    );
    return [statusItems, response.hasMore];
  }
}
