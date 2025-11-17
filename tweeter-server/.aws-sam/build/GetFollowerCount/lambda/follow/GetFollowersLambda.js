"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const FollowService_1 = require("../../model/service/FollowService");
const LambdaHelper_1 = require("../LambdaHelper");
const handler = async (request) => {
    const followService = new FollowService_1.FollowService();
    return await (0, LambdaHelper_1.tryCatchWrapper)(followService.loadMoreFollowers.bind(followService), request, "Get Followers Lambda");
};
exports.handler = handler;
//# sourceMappingURL=GetFollowersLambda.js.map