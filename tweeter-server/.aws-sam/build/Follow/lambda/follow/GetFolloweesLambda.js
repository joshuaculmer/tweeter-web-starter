"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const FollowService_1 = require("../../model/service/FollowService");
const handler = async (request) => {
    const followService = new FollowService_1.FollowService();
    return followService.loadMoreFollowees(request.token, request.userAlias, request.pageSize, request.lastItem);
};
exports.handler = handler;
//# sourceMappingURL=GetFolloweesLambda.js.map