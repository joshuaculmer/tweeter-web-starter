"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const StatusService_1 = require("../../model/service/StatusService");
const handler = async (request) => {
    const statusService = new StatusService_1.StatusService();
    return statusService.loadMoreFeedItems(request.token, request.userAlias, request.pageSize, request.lastItem);
};
exports.handler = handler;
//# sourceMappingURL=LoadMoreFeedItemsLambda.js.map