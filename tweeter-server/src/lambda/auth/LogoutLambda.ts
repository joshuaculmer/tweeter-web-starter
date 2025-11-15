import { TweeterResponse } from "tweeter-shared";
import { AuthService } from "../../model/service/AuthService";
import { LogoutRequest } from "tweeter-shared/src/model/net/request/LogoutRequest";
import { tryCatchWrapper } from "../LambdaHelper";

export const handler = async (
  LogoutRequest: LogoutRequest
): Promise<TweeterResponse> => {
  const authService = new AuthService();
  return tryCatchWrapper(authService.logout, LogoutRequest, "Logout Lambda");
};
