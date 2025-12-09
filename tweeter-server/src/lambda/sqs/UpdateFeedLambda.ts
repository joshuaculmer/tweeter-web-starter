import { SQSEvent } from "aws-lambda";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  BatchWriteCommand,
} from "@aws-sdk/lib-dynamodb";

const dynamoClient = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(dynamoClient);
const FEED_TABLE_NAME = "feed";

export interface UpdateFeedMessage {
  usernames: string[];
  newPost: string;
  timestamp: number;
  posterAlias: string;
  poster_firstName: string;
  poster_lastName: string;
  poster_imageUrl: string;
}

export const handler = async (event: SQSEvent): Promise<void> => {
  console.log(
    "UpdateFeed Lambda triggered with",
    event.Records.length,
    "records"
  );

  // Collect all feed items to write from all SQS messages
  const feedItems: any[] = [];

  for (const record of event.Records) {
    try {
      const message: UpdateFeedMessage = JSON.parse(record.body);
      // Create feed items for each username in this message

      for (const username of message.usernames) {
        feedItems.push({
          user_alias: message.posterAlias,
          followee_alias: username,
          timestamp: message.timestamp,
          post: message.newPost,
          user_firstName: message.poster_firstName,
          user_lastName: message.poster_lastName,
          user_imageUrl: message.poster_imageUrl,
        });
      }
    } catch (error) {
      console.error("Error parsing SQS message:", error);
      throw error;
    }
  }

  console.log(`Preparing to write ${feedItems.length} feed items`);

  // Batch write to DynamoDB (max 25 items per batch)
  const batches = chunkArray(feedItems, 25);

  for (const batch of batches) {
    try {
      const putRequests = batch.map((item) => ({
        PutRequest: {
          Item: item,
        },
      }));

      await docClient.send(
        new BatchWriteCommand({
          RequestItems: {
            [FEED_TABLE_NAME]: putRequests,
          },
        })
      );

      console.log(`Successfully wrote batch of ${batch.length} items`);
    } catch (error) {
      console.error("Error writing batch to DynamoDB:", error);
      throw error; // Throw to make SQS retry
    }
  }

  console.log(`Successfully processed all ${feedItems.length} feed items`);
};

// Helper function to chunk array into smaller arrays
function chunkArray<T>(array: T[], chunkSize: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
}
