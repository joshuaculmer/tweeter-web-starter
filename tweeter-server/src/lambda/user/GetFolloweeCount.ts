import { GetIsFollowerRequest } from "tweeter-shared/src/model/net/request/GetIsFollowerRequest";
import { UserService } from "../../model/service/UserService";

export const handler = async (
  request: GetIsFollowerRequest
): Promise<number> => {
  const userService = new UserService();
  return userService.getFolloweeCount(request.token, request.user);
};
