import { UserService } from "../../model/service/UserService";
import { FollowRequest } from "tweeter-shared/src/model/net/request/FollowRequest";

export const handler = async (request: FollowRequest): Promise<void> => {
  const userService = new UserService();
  userService.follow(request.token, request.userToFollow);
};
