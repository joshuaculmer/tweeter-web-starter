import { AuthResponse } from "tweeter-shared";
import { AuthService } from "../../model/service/AuthService";
import { LoginRequest } from "tweeter-shared/src/model/net/request/LoginRequest";
import { tryCatchWrapper } from "../LambdaHelper";
import { FakeAuthDAO } from "../../model/dao/FakeDataDao/FakeAuthDAO";
import { DynamoAuthDAO } from "../../model/dao/DynamoDao/DynamoAuthDAO";

const authDao = new DynamoAuthDAO();
export const handler = async (
  loginRequest: LoginRequest
): Promise<AuthResponse> => {
  const authService = new AuthService(authDao);
  return tryCatchWrapper(authService.login, loginRequest, "Login Lambda");
};
