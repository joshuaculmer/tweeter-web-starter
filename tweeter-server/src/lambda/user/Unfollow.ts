import { TweeterResponse } from "tweeter-shared";
import { UserService } from "../../model/service/UserService";
import { UnfollowRequest } from "tweeter-shared/src/model/net/request/UnfollowRequest";
import { tryCatchWrapper } from "../LambdaHelper";

export const handler = async (
  request: UnfollowRequest
): Promise<TweeterResponse> => {
  const userService = new UserService();
  return await tryCatchWrapper(
    userService.unfollow,
    request,
    "Unfollow Lambda"
  );
};
