import { GetIsFollowee } from "tweeter-shared/src/model/net/request/GetIsFollowee";
import { UserService } from "../../model/service/UserService";

export const handler = async (request: GetIsFollowee): Promise<number> => {
  const userService = new UserService();
  return userService.getFollowerCount(request.token, request.user);
};
