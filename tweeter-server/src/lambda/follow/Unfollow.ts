import { TweeterResponse } from "tweeter-shared";
import { UnfollowRequest } from "tweeter-shared/src/model/net/request/UnfollowRequest";
import { tryCatchWrapper } from "../LambdaHelper";
import { FollowService } from "../../model/service/FollowService";
import { DynamoFollowDAO } from "../../model/dao/DynamoDao/DynamoFollowDAO";

const followDAO = new DynamoFollowDAO();
export const handler = async (
  request: UnfollowRequest
): Promise<TweeterResponse> => {
  const userService = new FollowService(followDAO);
  console.log("Unfollow Lambda received request:", request);
  return await tryCatchWrapper(
    userService.unfollow,
    request,
    "Unfollow Lambda"
  );
};
