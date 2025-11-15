import { AuthResponse, AuthToken, UserDto } from "tweeter-shared";
import { AuthService } from "../../model/service/AuthService";
import { RegisterRequest } from "tweeter-shared/src/model/net/request/RegisterRequest";

export const hanlder = async (
  RegisterRequest: RegisterRequest
): Promise<AuthResponse> => {
  const authService = new AuthService();
  return authService.register(
    RegisterRequest.firstName,
    RegisterRequest.lastName,
    RegisterRequest.alias,
    RegisterRequest.password,
    RegisterRequest.userImageBytes,
    RegisterRequest.imageFileExtension
  );
};
