import { TweeterResponse } from "tweeter-shared";
import { UserService } from "../../model/service/UserService";
import { FollowRequest } from "tweeter-shared/src/model/net/request/FollowRequest";
import { tryCatchWrapper } from "../LambdaHelper";
import { FakeUserDAO } from "../../model/dao/FakeDataDao/FakeUserDAO";
import { FollowService } from "../../model/service/FollowService";

export const handler = async (
  request: FollowRequest
): Promise<TweeterResponse> => {
  const userService = new FollowService();
  return await tryCatchWrapper(userService.follow, request, "Follow Lambda");
};
