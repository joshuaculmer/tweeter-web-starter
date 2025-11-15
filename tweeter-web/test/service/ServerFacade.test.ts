import { ServerFacade } from "../../src/model.service/ServerFacade";
import "isomorphic-fetch";

describe("ServerFacade", () => {
  let server = new ServerFacade();

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

  // it("should get the follower count for a user", async () => {
  //   const count = await server.getFollowerCount("@testuser");
  //   console.log("Follower count:", count);
  //   expect(count).toBeDefined();
  // });

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

  it("should be able to logout a user", async () => {
    const response = await server.logout("usertoken");
    expect(response).toBeDefined();
  });
});
