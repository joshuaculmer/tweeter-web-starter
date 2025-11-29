import { AuthToken, FakeData, User, UserDto } from "tweeter-shared";
import { AuthDAO } from "../AuthDAO";

export class FakeAuthDAO implements AuthDAO {
  async login(
    alias: string,
    password: string
  ): Promise<{ User: User; AuthToken: AuthToken }> {
    const user = FakeData.instance.firstUser;
    if (user === null) {
      throw new Error("Invalid alias or password");
    }
    return {
      User: user,
      AuthToken: FakeData.instance.authToken,
    };
  }
  async register(
    firstName: string,
    lastName: string,
    alias: string,
    password: string,
    userImageBytes: string,
    imageFileExtension: string
  ): Promise<{ User: User; AuthToken: AuthToken }> {
    const user = FakeData.instance.firstUser;

    if (user === null) {
      throw new Error("Invalid registration");
    }

    return {
      User: user,
      AuthToken: FakeData.instance.authToken,
    };
  }
  async logout(token: string): Promise<boolean> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return true;
  }
}
