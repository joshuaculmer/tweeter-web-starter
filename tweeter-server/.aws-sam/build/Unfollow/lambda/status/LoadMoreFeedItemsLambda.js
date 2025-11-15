"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const StatusService_1 = require("../../model/service/StatusService");
const LambdaHelper_1 = require("../LambdaHelper");
const handler = async (request) => {
    const statusService = new StatusService_1.StatusService();
    return await (0, LambdaHelper_1.tryCatchWrapper)(statusService.loadMoreFeedItems, request, "Load More Feed Items Lambda");
};
exports.handler = handler;
//# sourceMappingURL=LoadMoreFeedItemsLambda.js.map