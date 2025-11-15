import { AuthResponse } from "tweeter-shared";
import { AuthService } from "../../model/service/AuthService";
import { RegisterRequest } from "tweeter-shared/src/model/net/request/RegisterRequest";
import { tryCatchWrapper } from "../LambdaHelper";

export const hanlder = async (
  RegisterRequest: RegisterRequest
): Promise<AuthResponse> => {
  const authService = new AuthService();
  return await tryCatchWrapper(
    authService.register,
    RegisterRequest,
    "Register Lambda"
  );
};
