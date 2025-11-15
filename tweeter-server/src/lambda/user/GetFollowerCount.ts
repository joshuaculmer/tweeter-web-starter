import { GetIsFolloweeRequest } from "tweeter-shared/src/model/net/request/GetIsFolloweeRequest";
import { UserService } from "../../model/service/UserService";
import { NumberResponse } from "tweeter-shared";

export const handler = async (
  request: GetIsFolloweeRequest
): Promise<NumberResponse> => {
  const userService = new UserService();
  return userService.getFollowerCount(request.token, request.user);
};
