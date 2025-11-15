"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hanlder = void 0;
const StatusService_1 = require("../../model/service/StatusService");
const LambdaHelper_1 = require("../LambdaHelper");
const hanlder = async (request) => {
    const statusService = new StatusService_1.StatusService();
    return await (0, LambdaHelper_1.tryCatchWrapper)(statusService.loadMoreStoryItems, request, "Load More Story Items Lambda");
};
exports.hanlder = hanlder;
//# sourceMappingURL=LoadMoreStoryItemsLambda.js.map