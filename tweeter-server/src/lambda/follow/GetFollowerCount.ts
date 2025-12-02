import { GetFollowerCountRequest } from "tweeter-shared/src/model/net/request/GetFollowerCountRequest";
import { NumberResponse } from "tweeter-shared";
import { tryCatchWrapper } from "../LambdaHelper";
import { FollowService } from "../../model/service/FollowService";
import { DynamoFollowDAO } from "../../model/dao/DynamoDao/DynamoFollowDAO";
const followDao = new DynamoFollowDAO();
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
