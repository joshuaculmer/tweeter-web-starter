import { UserService } from "../../model/service/UserService";
import { GetFolloweeCountRequest, NumberResponse } from "tweeter-shared";
import { tryCatchWrapper } from "../LambdaHelper";
import { FakeUserDAO } from "../../model/dao/FakeDataDao/FakeUserDAO";
import { FollowService } from "../../model/service/FollowService";


export const handler = async (
  request: GetFolloweeCountRequest
): Promise<NumberResponse> => {
  const userService = new FollowService();
  return await tryCatchWrapper(
    userService.getFolloweeCount,
    request,
    "Get Followee Count Lambda"
  );
};
