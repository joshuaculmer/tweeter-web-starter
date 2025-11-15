"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const buffer_1 = require("buffer");
const tweeter_shared_1 = require("tweeter-shared");
class AuthService {
    async login(alias, password) {
        // TODO: Replace with the result of calling the server
        const user = tweeter_shared_1.FakeData.instance.firstUser;
        if (user === null) {
            throw new Error("Invalid alias or password");
        }
        return {
            UserDto: user.dto,
            AuthToken: tweeter_shared_1.FakeData.instance.authToken,
            success: true,
            message: "Login successful",
        };
    }
    async register(firstName, lastName, alias, password, userImageBytes, imageFileExtension) {
        // Not neded now, but will be needed when you make the request to the server in milestone 3
        const imageStringBase64 = buffer_1.Buffer.from(userImageBytes).toString("base64");
        // TODO: Replace with the result of calling the server
        const user = tweeter_shared_1.FakeData.instance.firstUser;
        if (user === null) {
            throw new Error("Invalid registration");
        }
        return {
            UserDto: user.dto,
            AuthToken: tweeter_shared_1.FakeData.instance.authToken,
            success: true,
            message: "Register successful",
        };
    }
    logout = async (token) => {
        // Pause so we can see the logging out message. Delete when the call to the server is implemented.
        return { success: true, message: "Logged out successfully" };
    };
}
exports.AuthService = AuthService;
//# sourceMappingURL=AuthService.js.map