import { BooleanResponse } from "tweeter-shared";
import { UserService } from "../../model/service/UserService";
import { GetIsFollowerRequest } from "tweeter-shared/src/model/net/request/GetIsFollowerRequest";
import { tryCatchWrapper } from "../LambdaHelper";

export const handler = async (
  request: GetIsFollowerRequest
): Promise<BooleanResponse> => {
  const userService = new UserService();
  return await tryCatchWrapper(
    userService.getIsFollowerStatus,
    request,
    "Get Is Follower Status Lambda"
  );
};
