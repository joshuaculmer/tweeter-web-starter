import { AuthToken, User, UserDto } from "tweeter-shared";
import { AuthDAO } from "../AuthDAO";

export class DynamoAuthDAO implements AuthDAO {
    login(alias: string, password: string): { User: User; AuthToken: AuthToken; } {
        throw new Error("Method not implemented.");
    }
    register(firstName: string, lastName: string, alias: string, password: string, userImageBytes: string, imageFileExtension: string): { User: User; AuthToken: AuthToken; } {
        throw new Error("Method not implemented.");
    }
    logout(token: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}
