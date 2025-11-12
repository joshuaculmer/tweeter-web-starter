import { UserService } from "../../model/service/UserService";
import { GetIsFollower } from "tweeter-shared/src/model/net/request/GetIsFollower";

export const handler = async (request: GetIsFollower): Promise<boolean> => {
  const userService = new UserService();
  const isFollower = await userService.getIsFollowerStatus(
    request.token,
    request.user,
    request.selectedUser
  );
  return isFollower;
};
