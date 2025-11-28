import { GetFollowerCountRequest } from "tweeter-shared/src/model/net/request/GetFollowerCountRequest";
import { UserService } from "../../model/service/UserService";
import { NumberResponse } from "tweeter-shared";
import { tryCatchWrapper } from "../LambdaHelper";
import { FakeUserDAO } from "../../model/dao/FakeDataDao/FakeUserDAO";
import { FollowService } from "../../model/service/FollowService";

export const handler = async (
  request: GetFollowerCountRequest
): Promise<NumberResponse> => {
  const userService = new FollowService();
  return await tryCatchWrapper(
    userService.getFollowerCount,
    request,
    "Get Follower Count Lambda"
  );
};
