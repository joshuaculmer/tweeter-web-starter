import { TweeterResponse } from "tweeter-shared";
import { StatusService } from "../../model/service/StatusService";
import { PostStatusRequest } from "tweeter-shared/src/model/net/request/PostStatusRequest";
import { tryCatchWrapper } from "../LambdaHelper";

export const handler = async (
  postStatusRequest: PostStatusRequest
): Promise<TweeterResponse> => {
  const statusService = new StatusService();
  return await tryCatchWrapper(
    statusService.postStatus,
    postStatusRequest,
    "Post Status Lambda"
  );
};
