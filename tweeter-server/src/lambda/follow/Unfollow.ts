import { TweeterResponse } from "tweeter-shared";
import { UnfollowRequest } from "tweeter-shared/src/model/net/request/UnfollowRequest";
import { tryCatchWrapper } from "../LambdaHelper";
import { FollowService } from "../../model/service/FollowService";
import { FakeFollowDAO } from "../../model/dao/FakeDataDao/FakeFollowDAO";
const followDao = new FakeFollowDAO();
export const handler = async (
  request: UnfollowRequest
): Promise<TweeterResponse> => {
  const userService = new FollowService(followDao);
  return await tryCatchWrapper(
    userService.unfollow,
    request,
    "Unfollow Lambda"
  );
};
