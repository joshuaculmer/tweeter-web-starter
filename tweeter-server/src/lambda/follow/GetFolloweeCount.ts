import { UserService } from "../../model/service/UserService";
import { GetFolloweeCountRequest, NumberResponse } from "tweeter-shared";
import { tryCatchWrapper } from "../LambdaHelper";
import { FakeUserDAO } from "../../model/dao/FakeDataDao/FakeUserDAO";
import { FollowService } from "../../model/service/FollowService";
import { FakeFollowDAO } from "../../model/dao/FakeDataDao/FakeFollowDAO";

const followDao = new FakeFollowDAO();
export const handler = async (
  request: GetFolloweeCountRequest
): Promise<NumberResponse> => {
  const userService = new FollowService(followDao);
  return await tryCatchWrapper(
    userService.getFolloweeCount,
    request,
    "Get Followee Count Lambda"
  );
};
