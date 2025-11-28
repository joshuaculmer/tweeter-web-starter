import { TweeterResponse } from "tweeter-shared";
import { FollowRequest } from "tweeter-shared/src/model/net/request/FollowRequest";
import { tryCatchWrapper } from "../LambdaHelper";
import { FollowService } from "../../model/service/FollowService";
import { FakeFollowDAO } from "../../model/dao/FakeDataDao/FakeFollowDAO";

const followDAO = new FakeFollowDAO();
export const handler = async (
  request: FollowRequest
): Promise<TweeterResponse> => {
  const userService = new FollowService(followDAO);
  return await tryCatchWrapper(userService.follow, request, "Follow Lambda");
};
