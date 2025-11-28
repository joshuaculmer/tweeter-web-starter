import { GetFollowerCountRequest } from "tweeter-shared/src/model/net/request/GetFollowerCountRequest";
import { UserService } from "../../model/service/UserService";
import { NumberResponse } from "tweeter-shared";
import { tryCatchWrapper } from "../LambdaHelper";
import { FakeUserDAO } from "../../model/dao/FakeDataDao/FakeUserDAO";
import { FollowService } from "../../model/service/FollowService";
import { FakeFollowDAO } from "../../model/dao/FakeDataDao/FakeFollowDAO";
const followDao = new FakeFollowDAO();
export const handler = async (
  request: GetFollowerCountRequest
): Promise<NumberResponse> => {
  const userService = new FollowService(followDao);
  return await tryCatchWrapper(
    userService.getFollowerCount,
    request,
    "Get Follower Count Lambda"
  );
};
