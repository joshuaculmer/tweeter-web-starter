"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FollowService = void 0;
const tweeter_shared_1 = require("tweeter-shared");
class FollowService {
    async loadMoreFollowees(token, userAlias, pageSize, lastItem) {
        return await this.getFakeData(lastItem, pageSize, userAlias);
    }
    async loadMoreFollowers(token, userAlias, pageSize, lastItem) {
        // TODO: Replace with the result of calling server
        return await this.getFakeData(lastItem, pageSize, userAlias);
    }
    async getFakeData(lastItem, pageSize, userAlias) {
        const [items, hasMore] = tweeter_shared_1.FakeData.instance.getPageOfUsers(this.getDomainObject(lastItem), pageSize, userAlias);
        const dtos = items.map((user) => this.createDto(user));
        return [dtos, hasMore];
    }
    createDto(user) {
        return {
            firstName: user.firstName,
            lastName: user.lastName,
            alias: user.alias,
            imageUrl: user.imageUrl,
        };
    }
    getDomainObject(dto) {
        return dto == null
            ? null
            : new tweeter_shared_1.User(dto.firstName, dto.lastName, dto.alias, dto.imageUrl);
    }
}
exports.FollowService = FollowService;
//# sourceMappingURL=FollowService.js.map