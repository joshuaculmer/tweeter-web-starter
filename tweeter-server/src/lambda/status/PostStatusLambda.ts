import { TweeterResponse } from "tweeter-shared";
import { StatusService } from "../../model/service/StatusService";
import { PostStatusRequest } from "tweeter-shared/src/model/net/request/PostStatusRequest";

export const handler = async (
  postStatusRequest: PostStatusRequest
): Promise<TweeterResponse> => {
  const statusService = new StatusService();
  return statusService.postStatus(
    postStatusRequest.token,
    postStatusRequest.newStatus
  );
};
