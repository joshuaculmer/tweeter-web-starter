import { Buffer } from "buffer";
import {
  User,
  AuthToken,
  FakeData,
  UserDto,
  TweeterResponse,
  AuthResponse,
} from "tweeter-shared";

export class AuthService {
  public async login(alias: string, password: string): Promise<AuthResponse> {
    // TODO: Replace with the result of calling the server
    const user = FakeData.instance.firstUser;
    if (user === null) {
      throw new Error("Invalid alias or password");
    }
    return {
      UserDto: user.dto,
      AuthToken: FakeData.instance.authToken,
      success: true,
      message: "Login successful",
    };
  }

  public async register(
    firstName: string,
    lastName: string,
    alias: string,
    password: string,
    userImageBytes: Uint8Array,
    imageFileExtension: string
  ): Promise<AuthResponse> {
    // Not neded now, but will be needed when you make the request to the server in milestone 3
    const imageStringBase64: string =
      Buffer.from(userImageBytes).toString("base64");

    // TODO: Replace with the result of calling the server
    const user = FakeData.instance.firstUser;

    if (user === null) {
      throw new Error("Invalid registration");
    }

    return {
      UserDto: user.dto,
      AuthToken: FakeData.instance.authToken,
      success: true,
      message: "Register successful",
    };
  }

  public logout = async (token: String | null): Promise<TweeterResponse> => {
    // Pause so we can see the logging out message. Delete when the call to the server is implemented.
    return { success: true, message: "Logged out successfully" };
  };
}
