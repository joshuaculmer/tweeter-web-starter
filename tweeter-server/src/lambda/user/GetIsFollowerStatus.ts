import { UserService } from "../../model/service/UserService";
import { GetIsFollowerRequest } from "tweeter-shared/src/model/net/request/GetIsFollowerRequest";

export const handler = async (
  request: GetIsFollowerRequest
): Promise<boolean> => {
  const userService = new UserService();
  const isFollower = await userService.getIsFollowerStatus(
    request.token,
    request.user,
    request.selectedUser
  );
  return isFollower;
};
