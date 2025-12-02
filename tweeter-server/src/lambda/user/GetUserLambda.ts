import { UserService } from "../../model/service/UserService";
import { GetUserRequest } from "tweeter-shared/src/model/net/request/GetUserRequest";
import { UserResponse } from "tweeter-shared/src/model/net/response/UserResponse";
import { tryCatchWrapper } from "../LambdaHelper";
import { DynamoUserDAO } from "../../model/dao/DynamoDao/DynamoUserDAO";

const userDao = new DynamoUserDAO();
export const handler = async (
  request: GetUserRequest
): Promise<UserResponse> => {
  const userService = new UserService(userDao);
  return await tryCatchWrapper(userService.getUser, request, "Get User Lambda");
};
