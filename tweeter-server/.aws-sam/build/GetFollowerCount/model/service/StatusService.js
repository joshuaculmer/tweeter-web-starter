"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusService = void 0;
const tweeter_shared_1 = require("tweeter-shared");
class StatusService {
    async loadMoreFeedItems(request) {
        // TODO: Replace with the result of calling server
        const [items, hasMore] = tweeter_shared_1.FakeData.instance.getPageOfStatuses(request.lastItem, request.pageSize);
        return {
            items: items,
            hasMore: hasMore,
            success: true,
            message: "Fetched feed data successfully",
        };
    }
    async loadMoreStoryItems(request) {
        // TODO: Replace with the result of calling server
        const [items, hasMore] = tweeter_shared_1.FakeData.instance.getPageOfStatuses(request.lastItem, request.pageSize);
        return {
            items: items,
            hasMore: hasMore,
            success: true,
            message: "Fetched story data successfully",
        };
    }
    async postStatus(request) {
        // Pause so we can see the logging out message. Remove when connected to the server
        await new Promise((f) => setTimeout(f, 2000));
        // TODO: Call the server to post the status
        return { success: true, message: "Status posted successfully" };
    }
}
exports.StatusService = StatusService;
//# sourceMappingURL=StatusService.js.map