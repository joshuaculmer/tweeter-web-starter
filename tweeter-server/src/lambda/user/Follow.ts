import { TweeterResponse } from "tweeter-shared";
import { UserService } from "../../model/service/UserService";
import { FollowRequest } from "tweeter-shared/src/model/net/request/FollowRequest";
import { tryCatchWrapper } from "../LambdaHelper";

export const handler = async (
  request: FollowRequest
): Promise<TweeterResponse> => {
  const userService = new UserService();
  return await tryCatchWrapper(userService.follow, request, "Follow Lambda");
};
