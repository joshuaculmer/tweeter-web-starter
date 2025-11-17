import { UserService } from "../../model/service/UserService";
import { GetFolloweeCountRequest, NumberResponse } from "tweeter-shared";
import { tryCatchWrapper } from "../LambdaHelper";

export const handler = async (
  request: GetFolloweeCountRequest
): Promise<NumberResponse> => {
  const userService = new UserService();
  return await tryCatchWrapper(
    userService.getFolloweeCount,
    request,
    "Get Followee Count Lambda"
  );
};
