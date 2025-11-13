import { UserService } from "../../model/service/UserService";
import { UnfollowRequest } from "tweeter-shared/src/model/net/request/UnfollowRequest";

export const handler = async (request: UnfollowRequest): Promise<void> => {
  const userService = new UserService();
  userService.follow(request.token, request.userToUnfollow);
};
