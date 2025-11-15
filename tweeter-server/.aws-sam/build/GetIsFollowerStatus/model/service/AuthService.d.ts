import { TweeterResponse, AuthResponse, LogoutRequest, LoginRequest, RegisterRequest } from "tweeter-shared";
export declare class AuthService {
    login(request: LoginRequest): Promise<AuthResponse>;
    register(request: RegisterRequest): Promise<AuthResponse>;
    logout: (request: LogoutRequest) => Promise<TweeterResponse>;
}
//# sourceMappingURL=AuthService.d.ts.map