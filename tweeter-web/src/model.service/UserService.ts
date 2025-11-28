import { AuthToken, User } from "tweeter-shared";
import { Service } from "./Service";
import { ServerFacade } from "./ServerFacade";

export class UserService implements Service {
  private server = new ServerFacade();
  public async getUser(
    authToken: AuthToken,
    alias: string
  ): Promise<User | null> {
    return this.server.getUser(authToken, alias);
  }
}
