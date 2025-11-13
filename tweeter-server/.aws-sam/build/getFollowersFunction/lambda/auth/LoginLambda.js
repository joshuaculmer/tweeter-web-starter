"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const AuthService_1 = require("../../model/service/AuthService");
const handler = async (LoginRequest) => {
    const authService = new AuthService_1.AuthService();
    return authService.login(LoginRequest.alias, LoginRequest.password);
};
exports.handler = handler;
//# sourceMappingURL=LoginLambda.js.map