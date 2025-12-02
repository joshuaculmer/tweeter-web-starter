import { GetFolloweeCountRequest, NumberResponse } from "tweeter-shared";
import { tryCatchWrapper } from "../LambdaHelper";
import { FollowService } from "../../model/service/FollowService";
import { DynamoFollowDAO } from "../../model/dao/DynamoDao/DynamoFollowDAO";
const followDao = new DynamoFollowDAO();
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
