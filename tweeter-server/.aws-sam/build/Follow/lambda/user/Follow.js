"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const UserService_1 = require("../../model/service/UserService");
const handler = async (request) => {
    const userService = new UserService_1.UserService();
    return userService.follow(request.token, request.userToFollow);
};
exports.handler = handler;
//# sourceMappingURL=Follow.js.map