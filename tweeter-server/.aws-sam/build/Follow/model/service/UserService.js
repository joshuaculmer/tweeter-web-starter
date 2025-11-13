"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const tweeter_shared_1 = require("tweeter-shared");
class UserService {
    async getUser(token, alias) {
        // TODO: Replace with the result of calling server
        const response = tweeter_shared_1.FakeData.instance.findUserByAlias(alias);
        return response ? response.dto : null;
    }
    async getIsFollowerStatus(token, user, selectedUser) {
        // TODO: Replace with the result of calling server
        return tweeter_shared_1.FakeData.instance.isFollower();
    }
    async getFolloweeCount(token, user) {
        // TODO: Replace with the result of calling server
        return tweeter_shared_1.FakeData.instance.getFolloweeCount(user.alias);
    }
    async getFollowerCount(token, user) {
        // TODO: Replace with the result of calling server
        return tweeter_shared_1.FakeData.instance.getFollowerCount(user.alias);
    }
    async unfollow(token, userToUnfollow) {
        // Pause so we can see the unfollow message. Remove when connected to the server
        await new Promise((f) => setTimeout(f, 2000));
        // TODO: Call the server
    }
    async follow(token, userToFollow) {
        // Pause so we can see the follow message. Remove when connected to the server
        await new Promise((f) => setTimeout(f, 2000));
        // TODO: Call the server
    }
}
exports.UserService = UserService;
//# sourceMappingURL=UserService.js.map