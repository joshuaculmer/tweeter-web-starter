"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const AuthService_1 = require("../../model/service/AuthService");
const LambdaHelper_1 = require("../LambdaHelper");
const handler = async (LogoutRequest) => {
    const authService = new AuthService_1.AuthService();
    return (0, LambdaHelper_1.tryCatchWrapper)(authService.logout, LogoutRequest, "Logout Lambda");
};
exports.handler = handler;
//# sourceMappingURL=LogoutLambda.js.map