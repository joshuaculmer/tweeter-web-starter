import { Buffer } from "buffer";
import { User, AuthToken } from "tweeter-shared";
import { Service } from "./Service";
import { ServerFacade } from "./ServerFacade";

export class AuthService implements Service {
  private server = new ServerFacade();

  public async login(
    alias: string,
    password: string
  ): Promise<[User, AuthToken]> {
    const user = this.server.login(alias, password);
    if (user === null) {
      throw new Error("Invalid alias or password");
    }
    return [(await user).user, (await user).token];
  }

  public async register(
    firstName: string,
    lastName: string,
    alias: string,
    password: string,
    userImageBytes: Uint8Array,
    imageFileExtension: string
  ): Promise<[User, AuthToken]> {
    const imageStringBase64: string =
      Buffer.from(userImageBytes).toString("base64");

    const response = await this.server.register({
      firstName: firstName,
      lastName: lastName,
      alias: alias,
      password: password,
      userImageBytes: imageStringBase64,
      imageFileExtension: imageFileExtension,
    });

    if (response === null) {
      throw new Error("Invalid registration");
    }

    return [response.user, response.token];
  }

  public logout = async (authToken: AuthToken | null): Promise<void> => {
    this.server.logout(authToken!.token);
  };
}
