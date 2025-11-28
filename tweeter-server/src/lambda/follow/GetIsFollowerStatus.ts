import { BooleanResponse } from "tweeter-shared";
import { UserService } from "../../model/service/UserService";
import { GetIsFollowerRequest } from "tweeter-shared/src/model/net/request/GetIsFollowerRequest";
import { tryCatchWrapper } from "../LambdaHelper";
import { FakeUserDAO } from "../../model/dao/FakeDataDao/FakeUserDAO";
import { FollowService } from "../../model/service/FollowService";
import { FakeFollowDAO } from "../../model/dao/FakeDataDao/FakeFollowDAO";

const followDao = new FakeFollowDAO();
export const handler = async (
  request: GetIsFollowerRequest
): Promise<BooleanResponse> => {
  const userService = new FollowService(followDao);
  return await tryCatchWrapper(
    userService.getIsFollowerStatus,
    request,
    "Get Is Follower Status Lambda"
  );
};
