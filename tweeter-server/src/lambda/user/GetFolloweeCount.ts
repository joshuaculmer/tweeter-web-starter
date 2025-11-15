import { GetIsFollowerRequest } from "tweeter-shared/src/model/net/request/GetIsFollowerRequest";
import { UserService } from "../../model/service/UserService";
import { NumberResponse } from "tweeter-shared";

export const handler = async (
  request: GetIsFollowerRequest
): Promise<NumberResponse> => {
  const userService = new UserService();
  return userService.getFolloweeCount(request.token, request.user);
};
