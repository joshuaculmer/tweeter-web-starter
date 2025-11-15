"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FollowService = void 0;
const tweeter_shared_1 = require("tweeter-shared");
class FollowService {
    async loadMoreFollowees(request) {
        return await this.getFakeData(request.lastItem, request.pageSize, request.userAlias);
    }
    async loadMoreFollowers(request) {
        // TODO: Replace with the result of calling server
        return await this.getFakeData(request.lastItem, request.pageSize, request.userAlias);
    }
    async getFakeData(lastItem, pageSize, userAlias) {
        const [items, hasMore] = tweeter_shared_1.FakeData.instance.getPageOfUsers(tweeter_shared_1.User.fromDto(lastItem), pageSize, userAlias);
        const dtos = items.map((user) => user.dto);
        return {
            items: dtos,
            hasMore: hasMore,
            success: true,
            message: "Fetched follow data successfully",
        };
    }
}
exports.FollowService = FollowService;
//# sourceMappingURL=FollowService.js.map