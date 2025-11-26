import { Status } from "tweeter-shared";
import { DAO } from "./DAO";
import { StatusDto } from "tweeter-shared/dist/model/dto/StatusDto";

export interface StatusDAO extends DAO {
  LoadMoreFeedItems(
    lastItem: Status | null,
    pageSize: number
  ): [StatusDto[], boolean];
  LoadMoreStoryItems(
    lastItem: Status | null,
    pageSize: number
  ): [StatusDto[], boolean];
  PostStatus(token: string, newstatus: string): Promise<boolean>;
}
