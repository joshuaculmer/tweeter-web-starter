import { TweeterResponse, AuthResponse } from "tweeter-shared";
export declare class AuthService {
    login(alias: string, password: string): Promise<AuthResponse>;
    register(firstName: string, lastName: string, alias: string, password: string, userImageBytes: Uint8Array, imageFileExtension: string): Promise<AuthResponse>;
    logout: (token: String | null) => Promise<TweeterResponse>;
}
//# sourceMappingURL=AuthService.d.ts.map