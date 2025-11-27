import { FakeData, User, UserDto } from "tweeter-shared";
import { UserDAO } from "../UserDAO";

export class FakeUserDAO implements UserDAO {
  GetUser(userAlias: string): UserDto | null {
    const user: User | null = FakeData.instance.findUserByAlias(userAlias);
    return user ? user.dto : null;
  }
}
