"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hanlder = void 0;
const AuthService_1 = require("../../model/service/AuthService");
const LambdaHelper_1 = require("../LambdaHelper");
const hanlder = async (RegisterRequest) => {
    const authService = new AuthService_1.AuthService();
    return await (0, LambdaHelper_1.tryCatchWrapper)(authService.register, RegisterRequest, "Register Lambda");
};
exports.hanlder = hanlder;
//# sourceMappingURL=RegisterLambda.js.map