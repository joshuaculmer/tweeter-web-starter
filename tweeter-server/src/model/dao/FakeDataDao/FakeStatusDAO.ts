import { FakeData, Status } from "tweeter-shared";
import { StatusDto } from "tweeter-shared/dist/model/dto/StatusDto";
import { StatusDAO } from "../StatusDAO";

export class FakeDataStatusDAO implements StatusDAO {
  async LoadMoreFeedItems(
    token: string,
    useralias: string,
    lastItem: Status,
    pageSize: number
  ): Promise<[StatusDto[], boolean]> {
    const [items, hasMore] = FakeData.instance.getPageOfStatuses(
      lastItem,
      pageSize
    );
    const itemsDto = items.map((status) => status.dto);
    return [itemsDto, hasMore];
  }

  async LoadMoreStoryItems(
    token: string,
    useralias: string,
    lastItem: Status,
    pageSize: number
  ): Promise<[StatusDto[], boolean]> {
    const [items, hasMore] = FakeData.instance.getPageOfStatuses(
      lastItem,
      pageSize
    );
    const itemsDto = items.map((status) => status.dto);
    return [itemsDto, hasMore];
  }

  async PostStatus(token: string, newstatus: string): Promise<boolean> {
    await new Promise((f) => setTimeout(f, 2000));
    return true;
  }
}
