import { UserService } from "../../model/service/UserService";
import { GetFolloweeCountRequest, NumberResponse } from "tweeter-shared";
import { tryCatchWrapper } from "../LambdaHelper";
import { FakeUserDAO } from "../../model/dao/FakeDataDao/FakeUserDAO";

const userDao = new FakeUserDAO();

export const handler = async (
  request: GetFolloweeCountRequest
): Promise<NumberResponse> => {
  const userService = new UserService(userDao);
  return await tryCatchWrapper(
    userService.getFolloweeCount,
    request,
    "Get Followee Count Lambda"
  );
};
