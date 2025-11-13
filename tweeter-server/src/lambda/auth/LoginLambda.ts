import { AuthToken, UserDto } from "tweeter-shared";
import { AuthService } from "../../model/service/AuthService";
import { LoginRequest } from "tweeter-shared/src/model/net/request/LoginRequest";

export const handler = async (
  LoginRequest: LoginRequest
): Promise<[UserDto, AuthToken]> => {
  const authService = new AuthService();
  return authService.login(LoginRequest.alias, LoginRequest.password);
};
