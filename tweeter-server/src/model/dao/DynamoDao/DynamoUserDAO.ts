import { FakeData, User, UserDto } from "tweeter-shared";
import { UserDAO } from "../UserDAO";

export class DynamoUserDAO implements UserDAO {
  GetUser(userAlias: string): UserDto | null {
    // const user: User | null;
    // get user from dynamo db
    return null;
  }
}
