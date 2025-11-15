import { GetIsFolloweeRequest } from "tweeter-shared/src/model/net/request/GetIsFolloweeRequest";
import { UserService } from "../../model/service/UserService";
import { NumberResponse } from "tweeter-shared";
import { tryCatchWrapper } from "../LambdaHelper";

export const handler = async (
  request: GetIsFolloweeRequest
): Promise<NumberResponse> => {
  const userService = new UserService();
  return await tryCatchWrapper(
    userService.getFolloweeCount,
    request,
    "Get Followee Count Lambda"
  );
};
