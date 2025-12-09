import {
  SQSClient,
  SendMessageBatchCommand,
  SendMessageBatchRequestEntry,
} from "@aws-sdk/client-sqs";
import { SQSEvent, SQSRecord } from "aws-lambda";
import { PostStatusRequest, User } from "tweeter-shared";
import { DynamoFollowDAO } from "../../model/dao/DynamoDao/DynamoFollowDAO";
import { FollowDAO } from "../../model/dao/FollowDAO";
import { usernameByToken } from "../../model/dao/DynamoDao/DynamoAuthDAO";
import { UpdateFeedMessage } from "./UpdateFeedLambda";
import { DynamoUserDAO } from "../../model/dao/DynamoDao/DynamoUserDAO";
import { UserService } from "../../model/service/UserService";
const followDAO: FollowDAO = new DynamoFollowDAO();
const userService = new UserService(new DynamoUserDAO());
const sqsClient = new SQSClient({});
const UPDATE_FEED_QUEUE_URL =
  "https://sqs.us-east-1.amazonaws.com/061039771580/updateFeedQueue";

export const handler = async (event: SQSEvent): Promise<void> => {
  console.log(
    "PostUpdateFeedMessages Lambda triggered with",
    event.Records.length,
    "records"
  );
  console.log("event contains", event);

  for (const record of event.Records) {
    try {
      // Parse the PostStatusRequest from the SQS message
      const postStatusRequest: PostStatusRequest = JSON.parse(record.body);
      console.log("Processing PostStatusRequest for", postStatusRequest);
      const posterAlias = await usernameByToken(postStatusRequest.token);
      console.log("Derived posterAlias:", posterAlias);
      if (!posterAlias || typeof posterAlias !== "string") {
        console.log("what is posteralias", posterAlias);
        throw new Error("Invalid auth token");
      }
      // Get poster user info
      const posterUser = await userService.getUser({
        userAlias: posterAlias,
        token: postStatusRequest.token,
      });
      console.log("Fetched user info for poster:", posterUser);

      // Get all followers for this user
      const followers = await getAllFollowers(posterAlias);
      console.log(`Found ${followers.length} followers for ${posterAlias}`);

      // Batch followers into groups of 25
      const batches = chunkArray(followers, 25);

      // Send batches to updateFeedQueue (max 10 messages per SendMessageBatch call)
      for (let i = 0; i < batches.length; i += 10) {
        const batchGroup = batches.slice(i, i + 10);

        const entries: SendMessageBatchRequestEntry[] = batchGroup.map(
          (batch, index) => {
            const message: UpdateFeedMessage = {
              usernames: batch,
              newPost: postStatusRequest.newStatus,
              timestamp: Date.now(),
              posterAlias: posterAlias,
              poster_firstName: posterUser.user!.firstName,
              poster_lastName: posterUser.user!.lastName,
              poster_imageUrl: posterUser.user!.imageUrl,
            };

            return {
              Id: `${i + index}`,
              MessageBody: JSON.stringify(message),
            };
          }
        );

        await sqsClient.send(
          new SendMessageBatchCommand({
            QueueUrl: UPDATE_FEED_QUEUE_URL,
            Entries: entries,
          })
        );

        console.log(
          `Sent batch group ${i / 10 + 1} with ${entries.length} messages`
        );
      }

      console.log(
        `Successfully processed PostStatusRequest for ${posterAlias}`
      );
    } catch (error) {
      console.error("Error processing record:", error);
      throw error; // Throw to make SQS retry
    }
  }
};

// Helper function to get all followers (with pagination)
async function getAllFollowers(userAlias: string): Promise<string[]> {
  const followers: string[] = await followDAO.getFollowersUsernames(
    userAlias,
    undefined
  );
  return followers;
}

// Helper function to chunk array into smaller arrays
function chunkArray<T>(array: T[], chunkSize: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
}
