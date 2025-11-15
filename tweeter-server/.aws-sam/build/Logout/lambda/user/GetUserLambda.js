"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const UserService_1 = require("../../model/service/UserService");
const LambdaHelper_1 = require("../LambdaHelper");
const handler = async (request) => {
    const userService = new UserService_1.UserService();
    return await (0, LambdaHelper_1.tryCatchWrapper)(userService.getUser, request, "Get User Lambda");
};
exports.handler = handler;
//# sourceMappingURL=GetUserLambda.js.map