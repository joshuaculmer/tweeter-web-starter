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
  private feedTableName = "feed";
  private authTokenTableName = "authtoken";
  private authTableName = "authentication";
  private client = DynamoDBDocumentClient.from(new DynamoDBClient({}));

  private getStatusesByUser = async (
    userAlias: string,
    limit: number = 10,
    tableName: string,
    lastItemTimestamp?: number
  ): Promise<{ statuses: StatusDto[]; lastItem?: StatusDto }> => {
    const params: any = {
      TableName: tableName,
      KeyConditionExpression: "user_alias = :alias",
      ExpressionAttributeValues: {
        ":alias": userAlias,
      },
      ScanIndexForward: false, // Most recent first
      Limit: limit,
    };

    // Add pagination if lastItemTimestamp is provided
    if (lastItemTimestamp !== undefined) {
      params.ExclusiveStartKey = {
        user_alias: userAlias,
        timestamp: lastItemTimestamp,
      };
    }

    const result = await this.client.send(new QueryCommand(params));

    const statuses = (result.Items || []).map((item) => ({
      post: item.post,
      timestamp: item.timestamp,
      user: {
        firstName: item.user_firstName,
        lastName: item.user_lastName,
        alias: item.user_alias,
        imageUrl: item.user_imageUrl,
      },
    }));

    // Return the last item for pagination (only if exists)
    if (statuses.length > 0) {
      const lastItem = statuses[statuses.length - 1]!;
      return { statuses, lastItem };
    }

    return { statuses };
  };

  private getFeedByUser = async (
    userAlias: string,
    limit: number = 10,
    tableName: string,
    lastItemTimestamp?: number
  ): Promise<{ statuses: StatusDto[]; lastItem?: StatusDto }> => {
    const params: any = {
      TableName: tableName,
      KeyConditionExpression: "followee_alias = :alias",
      ExpressionAttributeValues: {
        ":alias": userAlias,
      },
      ScanIndexForward: false, // Most recent first
      Limit: limit,
    };

    // Add pagination if lastItemTimestamp is provided
    if (lastItemTimestamp !== undefined) {
      params.ExclusiveStartKey = {
        user_alias: userAlias,
        timestamp: lastItemTimestamp,
      };
    }

    const result = await this.client.send(new QueryCommand(params));

    const statuses = (result.Items || []).map((item) => ({
      post: item.post,
      timestamp: item.timestamp,
      user: {
        firstName: item.user_firstName,
        lastName: item.user_lastName,
        alias: item.user_alias,
        imageUrl: item.user_imageUrl,
      },
    }));

    // Return the last item for pagination (only if exists)
    if (statuses.length > 0) {
      const lastItem = statuses[statuses.length - 1]!;
      return { statuses, lastItem };
    }

    return { statuses };
  };

  // private getStatusesByUsers = async (
  //   userAliases: string[],
  //   limitPerUser: number = 10,
  //   lastItems?: Map<string, number> // Map of user_alias -> last timestamp
  // ): Promise<{ statuses: StatusDto[]; lastItems: Map<string, number> }> => {
  //   // Query each user in parallel
  //   const results = await Promise.all(
  //     userAliases.map(async (alias) => {
  //       const lastTimestamp = lastItems?.get(alias);
  //       return {
  //         alias,
  //         result: await this.getStatusesByUser(
  //           alias,
  //           limitPerUser,
  //           lastTimestamp
  //         ),
  //       };
  //     })
  //   );

  //   // Combine all statuses
  //   const allStatuses = results.flatMap((r) => r.result.statuses);

  //   // Sort by timestamp (most recent first)
  //   allStatuses.sort((a, b) => b.timestamp - a.timestamp);

  //   // Track last items for each user for pagination
  //   const newLastItems = new Map<string, number>();
  //   results.forEach((r) => {
  //     if (r.result.lastItem) {
  //       newLastItems.set(r.alias, r.result.lastItem.timestamp);
  //     }
  //   });

  //   return { statuses: allStatuses, lastItems: newLastItems };
  // };

  private getStatusesByUsers = async (
    userAliases: string[],
    limitPerUser: number = 10,
    tableName: string,
    lastItem?: StatusDto | number // Can pass lastItem, timestamp, or nothing
  ): Promise<{ statuses: StatusDto[]; lastItem?: StatusDto }> => {
    // Determine the timestamp to use for pagination
    let startTimestamp: number | undefined;
    if (lastItem !== undefined) {
      startTimestamp =
        typeof lastItem === "number" ? lastItem : lastItem.timestamp;
    }

    // Query each user in parallel
    const results = await Promise.all(
      userAliases.map(async (alias) => {
        return {
          alias,
          result: await this.getStatusesByUser(
            alias,
            limitPerUser,
            tableName,
            startTimestamp
          ),
        };
      })
    );

    // Combine all statuses
    const allStatuses = results.flatMap((r) => r.result.statuses);

    // Sort by timestamp (most recent first)
    allStatuses.sort((a, b) => b.timestamp - a.timestamp);

    // Take only the requested limit from the combined sorted results
    const limitedStatuses = allStatuses.slice(
      0,
      limitPerUser * userAliases.length
    );

    // Return the last item for pagination (from the combined, sorted list)
    if (limitedStatuses.length > 0) {
      const newLastItem = limitedStatuses[limitedStatuses.length - 1]!;
      return { statuses: limitedStatuses, lastItem: newLastItem };
    }

    return { statuses: limitedStatuses };
  };

  public LoadMoreFeedItems = async (
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
          ":token": token,
        },
      })
    );

    if (!queryResult.Items || queryResult.Items.length === 0) {
      throw new Error("Invalid auth token");
    }

    // get feed items from feed table associated with user
    const itemsDto: StatusDto[] = [];
    const { statuses, lastItem: newLastItem } = await this.getFeedByUser(
      useralias,
      pageSize,
      this.feedTableName,
      lastItem ? lastItem.timestamp : undefined
    );
    itemsDto.push(...statuses);
    // determine if there are more items by comparing pagesize to returned items
    const hasMore = statuses.length === pageSize;

    return [itemsDto, hasMore];
  };

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

    // get status items associate with user
    const itemsDto: StatusDto[] = [];
    const { statuses, lastItem: newLastItem } = await this.getStatusesByUser(
      useralias,
      pageSize,
      this.statusTableName,
      lastItem ? lastItem.timestamp : undefined
    );
    itemsDto.push(...statuses);
    // determine if there are more items by comparing pagesize to returned items
    const hasMore = statuses.length === pageSize;

    return [itemsDto, hasMore];
  };

  public PostStatus = async (
    token: string,
    newstatus: string
  ): Promise<boolean> => {
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
