import { TweeterResponse } from "tweeter-shared";
import { UserService } from "../../model/service/UserService";
import { UnfollowRequest } from "tweeter-shared/src/model/net/request/UnfollowRequest";
import { tryCatchWrapper } from "../LambdaHelper";
import { FakeUserDAO } from "../../model/dao/FakeDataDao/FakeUserDAO";

const userDao = new FakeUserDAO();
export const handler = async (
  request: UnfollowRequest
): Promise<TweeterResponse> => {
  const userService = new UserService(userDao);
  return await tryCatchWrapper(
    userService.unfollow,
    request,
    "Unfollow Lambda"
  );
};
