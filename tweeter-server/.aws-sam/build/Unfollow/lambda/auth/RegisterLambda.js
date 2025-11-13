"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hanlder = void 0;
const AuthService_1 = require("../../model/service/AuthService");
const hanlder = async (RegisterRequest) => {
    const authService = new AuthService_1.AuthService();
    return authService.register(RegisterRequest.firstName, RegisterRequest.lastName, RegisterRequest.alias, RegisterRequest.password, RegisterRequest.userImageBytes, RegisterRequest.imageFileExtension);
};
exports.hanlder = hanlder;
//# sourceMappingURL=RegisterLambda.js.map