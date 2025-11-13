"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const StatusService_1 = require("../../model/service/StatusService");
const handler = async (postStatusRequest) => {
    const statusService = new StatusService_1.StatusService();
    return statusService.postStatus(postStatusRequest.token, postStatusRequest.newStatus);
};
exports.handler = handler;
//# sourceMappingURL=PostStatusLambda.js.map