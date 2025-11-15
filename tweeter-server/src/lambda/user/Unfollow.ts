import { TweeterResponse } from "tweeter-shared";
import { UserService } from "../../model/service/UserService";
import { UnfollowRequest } from "tweeter-shared/src/model/net/request/UnfollowRequest";

export const handler = async (
  request: UnfollowRequest
): Promise<TweeterResponse> => {
  const userService = new UserService();
  return userService.follow(request.token, request.userToUnfollow);
};
