import { GetFollowerCountRequest } from "tweeter-shared/src/model/net/request/GetFollowerCountRequest";
import { UserService } from "../../model/service/UserService";
import { NumberResponse } from "tweeter-shared";
import { tryCatchWrapper } from "../LambdaHelper";
import { FakeUserDAO } from "../../model/dao/FakeDataDao/FakeUserDAO";

const userDao = new FakeUserDAO();
export const handler = async (
  request: GetFollowerCountRequest
): Promise<NumberResponse> => {
  const userService = new UserService(userDao);
  return await tryCatchWrapper(
    userService.getFollowerCount,
    request,
    "Get Follower Count Lambda"
  );
};
