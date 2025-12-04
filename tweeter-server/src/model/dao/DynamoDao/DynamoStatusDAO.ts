import { StatusDto } from "tweeter-shared/dist/model/dto/StatusDto";
import { StatusDAO } from "../StatusDAO";
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  QueryCommand,
} from "@aws-sdk/lib-dynamodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { usernameByToken } from "./DynamoAuthDAO";

export class DynamoStatusDAO implements StatusDAO {
  private statusTableName = "status";
  private authTokenTableName = "authtoken";
  private authTableName = "authentication";
  private client = DynamoDBDocumentClient.from(new DynamoDBClient({}));

  LoadMoreFeedItems(
    token: string,
    useralias: string,
    lastItem: StatusDto | null,
    pageSize: number
  ): Promise<[StatusDto[], boolean]> {
    throw new Error("Method not implemented.");
  }
  public LoadMoreStoryItems = async (
    token: string,
    useralias: string,
    lastItem: StatusDto | null,
    pageSize: number
  ): Promise<[StatusDto[], boolean]> => {
    // validate token
    // Query the GSI to find the username associated with this token
    const queryResult = await this.client.send(
      new QueryCommand({
        TableName: this.authTokenTableName,
        IndexName: "authtoken_index",
        KeyConditionExpression: "authtoken = :token", // Make sure 'authtoken' matches your GSI partition key name
        ExpressionAttributeValues: {
          ":token": token, // Remove the { S: token } wrapper - the SDK handles this
        },
      })
    );

    if (!queryResult.Items || queryResult.Items.length === 0) {
      throw new Error("Invalid auth token");
    }

    // get status items associate with my user
    const statusQueryResult = await this.client.send(
      new QueryCommand({
        TableName: this.statusTableName,
        KeyConditionExpression: "user_alias = :alias",
        ExpressionAttributeValues: {
          ":alias": useralias,
        },
        ScanIndexForward: false, // Most recent first
        Limit: pageSize,
      })
    );

    if (!statusQueryResult.Items) {
      return [[], false];
    }

    const itemsDto = statusQueryResult.Items.map((item) => ({
      post: item.post,
      user: {
        firstName: item.user_firstName,
        lastName: item.user_lastName,
        alias: item.user_alias,
        imageUrl: item.user_imageUrl,
      },
      timestamp: item.timestamp,
    }));

    const hasMore = statusQueryResult.Items.length === pageSize;

    return [itemsDto, hasMore];
  };
  PostStatus = async (token: string, newstatus: string): Promise<boolean> => {
    // validate token
    const username = await usernameByToken(token);
    if (!username) {
      throw new Error("Token is invalid");
    }

    // Get user from authentication table
    const result = await this.client.send(
      new GetCommand({
        TableName: this.authTableName,
        Key: {
          username: username,
        },
      })
    );

    // Verify item exists and password exists on it for type checking
    if (!result.Item) {
      throw new Error("invalid authentication");
    }

    // extract user information
    const firstName = result.Item.first_name;
    const lastName = result.Item.last_name;
    const imageUrl = result.Item.image_url;

    const item = {
      post: newstatus,
      timestamp: Date.now(),
      user_alias: username,
      user_firstName: firstName,
      user_lastName: lastName,
      user_imageUrl: imageUrl,
    };

    // send item to status table
    await this.client.send(
      new PutCommand({ TableName: this.statusTableName, Item: item })
    );

    return true;
  };
}
