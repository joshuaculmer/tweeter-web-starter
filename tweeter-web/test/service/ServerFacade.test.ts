import { ServerFacade } from "../../src/model.service/ServerFacade";
import "isomorphic-fetch";

describe("ServerFacade", () => {
  let server = new ServerFacade();

  // Authentication tests

  // it("should register a new user", async () => {
  //   const response = await server.register({
  //     firstName: "Test",
  //     lastName: "User",
  //     alias: "@testuser",
  //     password: "password",
  //     userImageBytes: new Uint8Array(),
  //     imageFileExtension: "png",
  //   });
  //   console.log("Register response:", response);
  //   expect(response).toBeDefined();
  // });

  // it("should be able to logout a user", async () => {
  //   const response = await server.logout("usertoken");
  //   console.log("Logout response:", response);
  //   expect(response).toBeUndefined();
  // });

  it("should be able to login a user", async () => {
    const response = await server.login("@testuser", "password");
    console.log("Login response:", response);
    expect(response.token).toBeDefined();
    expect(response.user).toBeDefined();
  });

  // Paginations tests for followers and followees
  // it("should get followers for a user", async () => {
  //   const followers = await server.getMoreFollowers({
  //     token: "usertoken",
  //     userAlias: "@testuser",
  //     pageSize: 10,
  //     lastItem: {
  //       firstName: "Test",
  //       lastName: "User",
  //       alias: "@testuser",
  //       imageUrl: "",
  //     },
  //   });
  //   expect(followers).toBeDefined();
  // });

  // it("should get followees for a user", async () => {
  //   const followers = await server.getMoreFollowees({
  //     token: "usertoken",
  //     userAlias: "@testuser",
  //     pageSize: 10,
  //     lastItem: {
  //       firstName: "Test",
  //       lastName: "User",
  //       alias: "@testuser",
  //       imageUrl: "",
  //     },
  //   });
  //   expect(followers).toBeDefined();
  // });

  // Status service tests

  // User service tests

  // it("should get the follower count for a user", async () => {
  //   const response = await server.getFollowerCount("@testuser");
  //   console.log("Follower count:", response);
  //   expect(response).toBeGreaterThanOrEqual(0);
  // });

  // it("should get the followee count for a user", async () => {
  //   const response = await server.getFolloweeCount("@testuser");
  //   console.log("Follower count:", response);
  //   expect(response).toBeGreaterThanOrEqual(0);
  // });
});
