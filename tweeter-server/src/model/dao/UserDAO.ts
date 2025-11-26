import { DAO } from "./DAO";
import { UserDto } from "tweeter-shared";

export interface UsarDAO extends DAO {
  GetUser(userAlias: string): UserDto;
}
