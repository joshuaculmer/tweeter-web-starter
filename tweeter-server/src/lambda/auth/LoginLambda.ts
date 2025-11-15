import { AuthResponse } from "tweeter-shared";
import { AuthService } from "../../model/service/AuthService";
import { LoginRequest } from "tweeter-shared/src/model/net/request/LoginRequest";
import { tryCatchWrapper } from "../LambdaHelper";

export const handler = async (
  loginRequest: LoginRequest
): Promise<AuthResponse> => {
  const authService = new AuthService();
  return tryCatchWrapper(authService.login, loginRequest, "Login Lambda");
};
