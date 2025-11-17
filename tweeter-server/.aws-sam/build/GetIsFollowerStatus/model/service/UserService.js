"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const tweeter_shared_1 = require("tweeter-shared");
class UserService {
    async getUser(request) {
        // TODO: Replace with the result of calling server
        const response = tweeter_shared_1.FakeData.instance.findUserByAlias(request.userAlias);
        return {
            user: response ? response.dto : null,
            success: true,
            message: "Fetched user successfully",
        };
    }
    async getIsFollowerStatus(request) {
        // TODO: Replace with the result of calling server
        return {
            bool: tweeter_shared_1.FakeData.instance.isFollower(),
            success: true,
            message: "Fetched is follower status successfully",
        };
    }
    async getFolloweeCount(request) {
        // TODO: Replace with the result of calling server
        const count = await tweeter_shared_1.FakeData.instance.getFolloweeCount(request.alias);
        return {
            success: true,
            message: "Fetched followee count successfully",
            Number: count,
        };
    }
    async getFollowerCount(request) {
        // TODO: Replace with the result of calling server
        const count = await tweeter_shared_1.FakeData.instance.getFollowerCount(request.alias);
        return {
            success: true,
            message: "Fetched follower count successfully",
            Number: count,
        };
    }
    async unfollow(request) {
        // Pause so we can see the unfollow message. Remove when connected to the server
        await new Promise((f) => setTimeout(f, 2000));
        // TODO: Call the server
        return { success: true, message: "Unfollowed successfully" };
    }
    async follow(request) {
        // Pause so we can see the follow message. Remove when connected to the server
        await new Promise((f) => setTimeout(f, 2000));
        // TODO: Call the server
        return { success: true, message: "Followed successfully" };
    }
}
exports.UserService = UserService;
//# sourceMappingURL=UserService.js.map