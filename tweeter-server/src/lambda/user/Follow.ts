import { TweeterResponse } from "tweeter-shared";
import { UserService } from "../../model/service/UserService";
import { FollowRequest } from "tweeter-shared/src/model/net/request/FollowRequest";
import { tryCatchWrapper } from "../LambdaHelper";
import { FakeUserDAO } from "../../model/dao/FakeDataDao/FakeUserDAO";

const userDao = new FakeUserDAO();
export const handler = async (
  request: FollowRequest
): Promise<TweeterResponse> => {
  const userService = new UserService(userDao);
  return await tryCatchWrapper(userService.follow, request, "Follow Lambda");
};
