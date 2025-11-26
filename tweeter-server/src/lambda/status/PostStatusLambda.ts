import { TweeterResponse } from "tweeter-shared";
import { StatusService } from "../../model/service/StatusService";
import { PostStatusRequest } from "tweeter-shared/src/model/net/request/PostStatusRequest";
import { tryCatchWrapper } from "../LambdaHelper";
import { FakeDataStatusDAO } from "../../model/dao/FakeDataDao/FakeStatusDAO";
import { StatusDAO } from "../../model/dao/StatusDAO";

const statusdao: StatusDAO = new FakeDataStatusDAO();
export const handler = async (
  postStatusRequest: PostStatusRequest
): Promise<TweeterResponse> => {
  const statusService = new StatusService(statusdao);
  return await tryCatchWrapper(
    statusService.postStatus,
    postStatusRequest,
    "Post Status Lambda"
  );
};
