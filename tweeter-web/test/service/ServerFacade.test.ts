import { User } from "tweeter-shared";
import { ServerFacade } from "../../src/model.service/ServerFacade";
import "isomorphic-fetch";

describe("ServerFacade", () => {
  let server = new ServerFacade();

  // Authentication tests

  // This does not work yet
  it("should register a new user", async () => {
    const response = await server.register({
      firstName: "Test",
      lastName: "User",
      alias: "@testuser",
      password: "password",
      userImageBytes: "",
      imageFileExtension: "png",
    });
    console.log("Register response:", response);
    expect(response.token).toBeDefined();
    expect(response.user).toBeDefined();
  });

  it("should be able to logout a user", async () => {
    const response = await server.logout("usertoken");
    console.log("Logout response:", response);
    expect(response).toBeUndefined();
  });

  it("should be able to login a user", async () => {
    const response = await server.login("@testuser", "password");
    console.log("Login response:", response);
    expect(response.token).toBeDefined();
    expect(response.user).toBeDefined();
  });

  // Paginations tests for followers and followees
  it("should get followers for a user", async () => {
    const followers = await server.getMoreFollowers({
      token: "usertoken",
      userAlias: "@testuser",
      pageSize: 10,
      lastItem: {
        firstName: "Test",
        lastName: "User",
        alias: "@testuser",
        imageUrl: "",
      },
    });
    expect(followers).toBeDefined();
  });

  it("should get followees for a user", async () => {
    const followers = await server.getMoreFollowees({
      token: "usertoken",
      userAlias: "@testuser",
      pageSize: 10,
      lastItem: {
        firstName: "Test",
        lastName: "User",
        alias: "@testuser",
        imageUrl: "",
      },
    });
    expect(followers).toBeDefined();
  });

  // Status service tests

  it("should post a status for a user", async () => {
    const response = await server.postStatus(
      "usertoken",
      "This is a test status"
    );
    console.log("Post status response:", response);
    expect(response).toBeUndefined();
  });

  it("should load more feed items for a user", async () => {
    const [statuses, hasMore] = await server.loadMoreFeedItems({
      token: "usertoken",
      pageSize: 10,
      userAlias: "useralias",
      lastItem: null,
    });
    console.log("Feed items:", statuses);
    expect(statuses).toBeDefined();
    expect(typeof hasMore).toBe("boolean");
  });

  it("should load more story items for a user", async () => {
    const [statuses, hasMore] = await server.loadMoreStoryItems({
      token: "usertoken",
      pageSize: 10,
      userAlias: "useralias",
      lastItem: null,
    });
    console.log("Feed items:", statuses);
    expect(statuses).toBeDefined();
    expect(typeof hasMore).toBe("boolean");
  });

  // User service tests

  it("should be able to follow a user", async () => {
    const response = await server.follow(
      "usertoken",
      new User("Test", "User", "@testuser", "")
    );
    console.log("Follow user response:", response);
    expect(response).toBeUndefined();
  });

  it("should be able to unfollow a user", async () => {
    const response = await server.unfollow(
      "usertoken",
      new User("Test", "User", "@testuser", "")
    );
    console.log("Follow user response:", response);
    expect(response).toBeUndefined();
  });

  it("should get the follower count for a user", async () => {
    const response = await server.getFollowerCount("@testuser");
    console.log("Follower count:", response);
    expect(response).toBeGreaterThanOrEqual(0);
  });

  it("should get the followee count for a user", async () => {
    const response = await server.getFolloweeCount("@testuser");
    console.log("Follower count:", response);
    expect(response).toBeGreaterThanOrEqual(0);
  });
});
