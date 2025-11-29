import { AuthToken, User, UserDto } from "tweeter-shared";
import { AuthDAO } from "../AuthDAO";

import {
  DynamoDBClient,
  PutItemCommand,
  GetItemCommand,
  DeleteItemCommand,
  QueryCommand,
} from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import * as bcrypt from "bcryptjs";

export class DynamoAuthDAO implements AuthDAO {
  private authTableName = "authentication";
  private authTokenTableName = "authtoken";
  private client = DynamoDBDocumentClient.from(new DynamoDBClient({}));

  async register(
    firstName: string,
    lastName: string,
    alias: string,
    password: string,
    imageUrl: string,
    imageFileExtension: string
  ): Promise<{ User: User; AuthToken: AuthToken }> {
    // Hash the password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create user record in authentication table
    const userItem = {
      username: { S: alias },
      password_hash: { S: passwordHash },
      first_name: { S: firstName },
      last_name: { S: lastName },
      image_url: { S: imageUrl },
      image_file_extension: { S: imageFileExtension },
    };

    await this.client.send(
      new PutItemCommand({
        TableName: this.authTableName,
        Item: userItem,
      })
    );

    // Generate auth token
    const authToken = AuthToken.Generate();
    const timestamp = Date.now() + 24 * 60 * 60 * 1000; // 24 hours from now

    // Store auth token
    const tokenItem = {
      username: { S: alias },
      authtoken: { S: authToken.token },
      timestamp: { N: timestamp.toString() },
    };

    await this.client.send(
      new PutItemCommand({
        TableName: this.authTokenTableName,
        Item: tokenItem,
      })
    );

    // Create and return User object
    const user = new User(firstName, lastName, alias, imageUrl);

    return { User: user, AuthToken: authToken };
  }

  async login(
    alias: string,
    password: string
  ): Promise<{ User: User; AuthToken: AuthToken }> {
    // Get user from authentication table
    const result = await this.client.send(
      new GetItemCommand({
        TableName: this.authTableName,
        Key: {
          username: { S: alias },
        },
      })
    );

    // Verify item exists and password exists on it for type checking
    if (!result.Item) {
      throw new Error("Invalid alias or password");
    } else if (!result.Item.password_hash || !result.Item.password_hash.S) {
      throw new Error("Invalid alias or password");
    }

    const passwordHash = result.Item.password_hash.S;
    const isValid = await bcrypt.compare(password, passwordHash);

    if (!isValid) {
      throw new Error("Invalid alias or password");
    }

    // Generate new auth token
    const authToken = AuthToken.Generate();
    const timestamp = Date.now() + 24 * 60 * 60 * 1000; // 24 hours from now
    // TODO check if setting timestamp to 24 hours later is necessary for the auto deletion

    // Store auth token
    const tokenItem = {
      username: { S: alias },
      authtoken: { S: authToken.token },
      timestamp: { N: timestamp.toString() },
    };

    await this.client.send(
      new PutItemCommand({
        TableName: this.authTokenTableName,
        Item: tokenItem,
      })
    );

    // Verify user information came through correctly
    if (
      !result.Item.first_name ||
      !result.Item.last_name ||
      !result.Item.image_url
    ) {
      throw new Error("User information not found in database");
    }

    // Create and return User object
    const user = new User(
      result.Item.first_name.S!,
      result.Item.last_name.S!,
      alias,
      result.Item.image_url.S!
    );

    return { User: user, AuthToken: authToken };
  }

  async logout(token: string): Promise<boolean> {
    try {
      // Query the GSI to find the username associated with this token
      const queryResult = await this.client.send(
        new QueryCommand({
          TableName: this.authTokenTableName,
          IndexName: "authtoken_index",
          KeyConditionExpression: "authtoken = :token",
          ExpressionAttributeValues: {
            ":token": { S: token },
          },
        })
      );

      if (!queryResult.Items || queryResult.Items.length === 0) {
        return false; // Token not found
      }

      // TODO fix this typechecking/ignoring mess username
      // is a attribute name on the database so its guaranteed to be there,
      // but it just looks like a bit of a mess
      const username = queryResult!.Items[0]!.username!.S!;

      // Delete the token from the table
      await this.client.send(
        new DeleteItemCommand({
          TableName: this.authTokenTableName,
          Key: {
            username: { S: username },
          },
        })
      );

      return true;
    } catch (error) {
      console.error("Error during logout:", error);
      return false;
    }
  }
}
