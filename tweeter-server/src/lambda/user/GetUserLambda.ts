import { UserService } from "../../model/service/UserService";
import { GetUserRequest } from "tweeter-shared/src/model/net/request/GetUserRequest";
import { UserResponse } from "tweeter-shared/src/model/net/response/UserResponse";
import { tryCatchWrapper } from "../LambdaHelper";
import { FakeUserDAO } from "../../model/dao/FakeDataDao/FakeUserDAO";

const userDao = new FakeUserDAO();
export const handler = async (
  request: GetUserRequest
): Promise<UserResponse> => {
  const userService = new UserService(userDao);
  return await tryCatchWrapper(userService.getUser, request, "Get User Lambda");
};
