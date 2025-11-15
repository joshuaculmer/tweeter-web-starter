import { Buffer } from "buffer";
import { User, AuthToken, FakeData, FollowRequest } from "tweeter-shared";
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
    // Not neded now, but will be needed when you make the request to the server in milestone 3
    const imageStringBase64: string =
      Buffer.from(userImageBytes).toString("base64");

    const user = this.server.register({
      firstName: firstName,
      lastName: lastName,
      alias: alias,
      password: password,
      userImageBytes: imageStringBase64,
      imageFileExtension: imageFileExtension,
    });

    if (user === null) {
      throw new Error("Invalid registration");
    }

    return [user, FakeData.instance.authToken];
  }

  public logout = async (authToken: AuthToken | null): Promise<void> => {
    // Pause so we can see the logging out message. Delete when the call to the server is implemented.
    this.server.logout(authToken!.token);
  };
}
