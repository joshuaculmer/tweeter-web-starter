import { TweeterResponse } from "tweeter-shared";
import { StatusService } from "../../model/service/StatusService";
import { PostStatusRequest } from "tweeter-shared/src/model/net/request/PostStatusRequest";
import { tryCatchWrapper } from "../LambdaHelper";
import { StatusDAO } from "../../model/dao/StatusDAO";
import { DynamoStatusDAO } from "../../model/dao/DynamoDao/DynamoStatusDAO";
import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";

const statusdao: StatusDAO = new DynamoStatusDAO();
const sqsClient = new SQSClient({});
const QUEUE_URL = process.env.POST_STATUS_QUEUE_URL || "";

export const handler = async (
  postStatusRequest: PostStatusRequest
): Promise<TweeterResponse> => {
  const statusService = new StatusService(statusdao);

  // Post status to status table like normal
  const response = await tryCatchWrapper(
    statusService.postStatus,
    postStatusRequest,
    "Post Status Lambda"
  );

  // Add to post status queue
  try {
    const sqsMessage = {
      QueueUrl: QUEUE_URL,
      MessageBody: JSON.stringify(postStatusRequest),
    };

    await sqsClient.send(new SendMessageCommand(sqsMessage));
    console.log("Successfully sent message to postStatusQueue");
  } catch (error) {
    console.error("Error sending message to SQS:", error);
    // Note: We don't throw here because the status was already posted successfully
    // You may want to handle this differently based on your requirements
  }

  return response;
};
