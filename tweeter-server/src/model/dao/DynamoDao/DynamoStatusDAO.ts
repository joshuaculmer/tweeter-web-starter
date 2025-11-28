import { StatusDto } from "tweeter-shared/dist/model/dto/StatusDto";
import { StatusDAO } from "../StatusDAO";

export class DynamoStatusDAO implements StatusDAO{
    LoadMoreFeedItems(lastItem: StatusDto | null, pageSize: number): [StatusDto[], boolean] {
        throw new Error("Method not implemented.");
    }
    LoadMoreStoryItems(lastItem: StatusDto | null, pageSize: number): [StatusDto[], boolean] {
        throw new Error("Method not implemented.");
    }
    PostStatus(token: string, newstatus: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}