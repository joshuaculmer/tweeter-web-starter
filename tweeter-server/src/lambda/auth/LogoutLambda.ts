import { AuthService } from "../../model/service/AuthService";
import { LogoutRequest } from "tweeter-shared/src/model/net/request/LogoutRequest";

export const handler = async (LogoutRequest: LogoutRequest): Promise<void> => {
  const authService = new AuthService();
  return authService.logout(LogoutRequest.token);
};
