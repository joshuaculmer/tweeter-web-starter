import { AuthToken, User, UserDto } from "tweeter-shared";
import { DAO } from "./DAO";

export interface AuthDAO extends DAO {
  login(
    alias: string,
    password: string
  ): Promise<{ User: User; AuthToken: AuthToken }>;
  register(
    firstName: string,
    lastName: string,
    alias: string,
    password: string,
    userImageBytes: string,
    imageFileExtension: string
  ): Promise<{ User: User; AuthToken: AuthToken }>;
  logout(token: string): Promise<boolean>;
}
