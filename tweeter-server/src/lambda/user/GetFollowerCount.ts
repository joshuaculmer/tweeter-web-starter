import { GetFollowerCountRequest } from "tweeter-shared/src/model/net/request/GetFollowerCountRequest";
import { UserService } from "../../model/service/UserService";
import { NumberResponse } from "tweeter-shared";
import { tryCatchWrapper } from "../LambdaHelper";

export const handler = async (
  request: GetFollowerCountRequest
): Promise<NumberResponse> => {
  const userService = new UserService();
  return await tryCatchWrapper(
    userService.getFollowerCount,
    request,
    "Get Follower Count Lambda"
  );
};
