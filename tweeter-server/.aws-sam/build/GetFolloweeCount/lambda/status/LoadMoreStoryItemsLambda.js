"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hanlder = void 0;
const StatusService_1 = require("../../model/service/StatusService");
const hanlder = async (request) => {
    const statusService = new StatusService_1.StatusService();
    return statusService.loadMoreStoryItems(request.token, request.userAlias, request.pageSize, request.lastItem);
};
exports.hanlder = hanlder;
//# sourceMappingURL=LoadMoreStoryItemsLambda.js.map