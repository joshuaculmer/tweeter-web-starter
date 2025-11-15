import { TweeterResponse } from "tweeter-shared";
import { UserService } from "../../model/service/UserService";
import { FollowRequest } from "tweeter-shared/src/model/net/request/FollowRequest";

export const handler = async (
  request: FollowRequest
): Promise<TweeterResponse> => {
  const userService = new UserService();
  return userService.follow(request.token, request.userToFollow);
};
