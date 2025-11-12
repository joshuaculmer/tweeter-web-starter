import { GetIsFollower } from "tweeter-shared/src/model/net/request/GetIsFollower";
import { UserService } from "../../model/service/UserService";

export const handler = async (request: GetIsFollower): Promise<number> => {
  const userService = new UserService();
  return userService.getFolloweeCount(request.token, request.user);
};
