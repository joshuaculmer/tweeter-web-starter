"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const AuthService_1 = require("../../model/service/AuthService");
const handler = async (LogoutRequest) => {
    const authService = new AuthService_1.AuthService();
    return authService.logout(LogoutRequest.token);
};
exports.handler = handler;
//# sourceMappingURL=LogoutLambda.js.map    