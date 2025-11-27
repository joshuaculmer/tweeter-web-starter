import { Buffer } from "buffer";
import {
  TweeterResponse,
  AuthResponse,
  LogoutRequest,
  LoginRequest,
  RegisterRequest,
} from "tweeter-shared";
import { AuthDAO } from "../dao/AuthDAO";

export class AuthService {
  private dao: AuthDAO;

  public constructor(dao: AuthDAO) {
    this.dao = dao;
  }
  public login = async (request: LoginRequest): Promise<AuthResponse> => {
    const { User: user, AuthToken } = this.dao.login(
      request.alias,
      request.password
    );
    if (user === null) {
      throw new Error("Invalid alias or password");
    }
    return {
      UserDto: user.dto,
      AuthToken: AuthToken,
      success: true,
      message: "Login successful",
    };
  };

  public register = async (request: RegisterRequest): Promise<AuthResponse> => {
    // Not needed now, but will be needed when you make the request to the server in milestone 3
    const imageStringBase64: string = Buffer.from(
      request.userImageBytes
    ).toString("base64");

    // call the DAO to register the user
    const { User: user, AuthToken: authToken } = this.dao.register(
      request.firstName,
      request.lastName,
      request.alias,
      request.password,
      imageStringBase64,
      request.imageFileExtension
    );

    if (user === null) {
      throw new Error("Invalid registration");
    }

    return {
      UserDto: user.dto,
      AuthToken: authToken,
      success: true,
      message: "Register successful",
    };
  };

  public logout = async (request: LogoutRequest): Promise<TweeterResponse> => {
    const result = await this.dao.logout(request.token);
    return {
      success: result,
      message: result ? "Logout successful" : "Logout failed",
    };
  };
}
