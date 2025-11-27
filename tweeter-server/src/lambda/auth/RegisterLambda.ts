import { AuthResponse } from "tweeter-shared";
import { AuthService } from "../../model/service/AuthService";
import { RegisterRequest } from "tweeter-shared/src/model/net/request/RegisterRequest";
import { tryCatchWrapper } from "../LambdaHelper";
import { FakeAuthDAO } from "../../model/dao/FakeDataDao/FakeAuthDAO";

const authDao = new FakeAuthDAO();
export const handler = async (
  RegisterRequest: RegisterRequest
): Promise<AuthResponse> => {
  const authService = new AuthService(authDao);
  return await tryCatchWrapper(
    authService.register,
    RegisterRequest,
    "Register Lambda"
  );
};
