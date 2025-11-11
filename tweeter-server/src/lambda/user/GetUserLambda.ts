import { UserService } from "../../model/service/UserService";
import { GetUserRequest } from "tweeter-shared/src/model/net/request/GetUserRequest";
import { GetUserResponse } from "tweeter-shared/src/model/net/response/GetUserResponse";

export const handler = async (
  request: GetUserRequest
): Promise<GetUserResponse> => {
  const userService = new UserService();
  const userDto = await userService.getUser(request.token, request.userAlias);
  return {
    success: true,
    message: null,
    user: userDto,
  };
};
