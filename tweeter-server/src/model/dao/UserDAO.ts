import { DAO } from "./DAO";
import { UserDto } from "tweeter-shared";

export interface UserDAO extends DAO {
  GetUser(userAlias: string): Promise<UserDto | null>;
}
