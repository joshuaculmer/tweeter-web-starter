import { AuthToken, UserDto } from "tweeter-shared";
export declare class AuthService {
    login(alias: string, password: string): Promise<[UserDto, AuthToken]>;
    register(firstName: string, lastName: string, alias: string, password: string, userImageBytes: Uint8Array, imageFileExtension: string): Promise<[UserDto, AuthToken]>;
    logout: (token: String | null) => Promise<void>;
}
//# sourceMappingURL=AuthService.d.ts.map