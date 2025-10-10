import { useNavigate } from "react-router-dom";
import { useMessageActions } from "./messagehooks";
import { useUserInfo, useUserInfoActions } from "./UserInfoContexts";
import { UserService } from "../model.service/UserService";

export const useNavigateToUser = () => {
  const navigate = useNavigate();
  const { displayErrorMessage } = useMessageActions();
  const { displayedUser, authToken } = useUserInfo();
  const { setDisplayedUser } = useUserInfoActions();
  const userService = new UserService();

  const extractAlias = (value: string): string => {
    const index = value.indexOf("@");
    return value.substring(index);
  };

  const navigateToUser = async (event: React.MouseEvent): Promise<void> => {
    event.preventDefault();

    try {
      const alias = extractAlias(event.target.toString());

      const url = event.target.toString(); // use this to compute authtoken and such
      const toUser = await userService.getUser(authToken!, alias);
      console.log(url);
      if (toUser) {
        if (!toUser.equals(displayedUser!)) {
          setDisplayedUser(toUser);
          console.log(url);
          navigate(`${url}/${toUser.alias}`);
        }
      }
    } catch (error) {
      displayErrorMessage(`Failed to get user because of exception: ${error}`);
    }
  };

  return navigateToUser;
};
