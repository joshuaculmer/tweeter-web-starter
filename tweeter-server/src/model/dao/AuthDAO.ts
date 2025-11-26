import { UserDto } from "tweeter-shared";
import { DAO } from "./DAO";

export interface AuthDAO extends DAO {
  login(alias: string, password: string): UserDto | null;
  register(
    firstName: string,
    lastName: string,
    alias: string,
    password: string,
    userImageBytes: string,
    imageFileExtension: string
  ): UserDto | null;
  logout(token: string): boolean;
}
