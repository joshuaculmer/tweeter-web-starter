import {
  UserDto,
  UserResponse,
  GetUserRequest,
} from "tweeter-shared";
import { UserDAO } from "../dao/UserDAO";

export class UserService {
  private dao: UserDAO;
  public constructor(dao: UserDAO) {
    this.dao = dao;
  }
  public getUser = async (request: GetUserRequest): Promise<UserResponse> => {
    const user: UserDto | null = this.dao.GetUser(request.userAlias);
    if (user === null) {
      throw new Error("User not found");
    }
    return {
      user: user,
      success: true,
      message: "Fetched user successfully",
    };
  };

}
