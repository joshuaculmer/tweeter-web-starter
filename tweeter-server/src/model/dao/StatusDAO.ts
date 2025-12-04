import { DAO } from "./DAO";
import { StatusDto } from "tweeter-shared/dist/model/dto/StatusDto";

export interface StatusDAO extends DAO {
  LoadMoreFeedItems(
    token: string,
    useralias: string,
    lastItem: StatusDto | null,
    pageSize: number
  ): Promise<[StatusDto[], boolean]>;
  LoadMoreStoryItems(
    token: string,
    useralias: string,
    lastItem: StatusDto | null,
    pageSize: number
  ): Promise<[StatusDto[], boolean]>;
  PostStatus(token: string, newstatus: string): Promise<boolean>;
}
