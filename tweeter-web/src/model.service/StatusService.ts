import { AuthToken, Status } from "tweeter-shared";
import { Service } from "./Service";
import { ServerFacade } from "./ServerFacade";
import { StatusDto } from "tweeter-shared/dist/model/dto/StatusDto";

export class StatusService implements Service {
  private server = new ServerFacade();
  public async loadMoreFeedItems(
    authToken: AuthToken,
    userAlias: string,
    pageSize: number,
    lastItem: StatusDto | null
  ): Promise<[Status[], boolean]> {
    console.log("in status service, last item is:" + lastItem?.post);
    return this.server.loadMoreFeedItems({
      token: authToken.token,
      userAlias: userAlias,
      pageSize: pageSize,
      lastItem: lastItem,
    });
  }

  public async loadMoreStoryItems(
    authToken: AuthToken,
    userAlias: string,
    pageSize: number,
    lastItem: StatusDto | null
  ): Promise<[Status[], boolean]> {
    return this.server.loadMoreStoryItems({
      token: authToken.token,
      userAlias: userAlias,
      pageSize: pageSize,
      lastItem: lastItem,
    });
  }

  public async postStatus(
    authToken: AuthToken,
    newStatus: string
  ): Promise<void> {
    this.server.postStatus(authToken.token, newStatus);
  }
}
