import { BooleanResponse } from "tweeter-shared";
import { UserService } from "../../model/service/UserService";
import { GetIsFollowerRequest } from "tweeter-shared/src/model/net/request/GetIsFollowerRequest";

export const handler = async (
  request: GetIsFollowerRequest
): Promise<BooleanResponse> => {
  const userService = new UserService();
  return userService.getIsFollowerStatus(
    request.token,
    request.user,
    request.selectedUser
  );
};
