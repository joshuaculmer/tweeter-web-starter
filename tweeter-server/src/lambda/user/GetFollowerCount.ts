import { GetIsFolloweeRequest } from "tweeter-shared/src/model/net/request/GetIsFolloweeRequest";
import { UserService } from "../../model/service/UserService";

export const handler = async (
  request: GetIsFolloweeRequest
): Promise<number> => {
  const userService = new UserService();
  return userService.getFollowerCount(request.token, request.user);
};
