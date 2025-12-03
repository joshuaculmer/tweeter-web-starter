import { FakeData, User, UserDto } from "tweeter-shared";
import { UserDAO } from "../UserDAO";
import {
  DynamoDBClient,
  GetItemCommand,
  GetItemCommandOutput,
} from "@aws-sdk/client-dynamodb";
import {
  BatchGetCommand,
  BatchGetCommandInput,
  DynamoDBDocumentClient,
} from "@aws-sdk/lib-dynamodb";
import { table } from "console";

export async function getUserCommand(
  tableName: string,
  userAlias: string,
  client: DynamoDBClient
): Promise<GetItemCommandOutput> {
  const getUserCommand = {
    TableName: tableName,
    Key: {
      username: { S: userAlias },
    },
  };
  const userdata = await client.send(new GetItemCommand(getUserCommand));
  return userdata;
}

export async function batchGetUsers(
  aliases: string[],
  tableName: string,
  client: DynamoDBDocumentClient
): Promise<UserDto[]> {
  if (aliases.length === 0) {
    return [];
  }
  const params: BatchGetCommandInput = {
    RequestItems: {
      [tableName]: {
        Keys: aliases.map((alias) => ({ username: alias })),
      },
    },
  };
  console.log("Batch get users params:", JSON.stringify(params, null, 2));
  const data = await client.send(new BatchGetCommand(params));
  const users: UserDto[] = [];
  const items = data.Responses ? data.Responses[tableName] : [];
  console.log("Batch get users result items:", items);
  if (!items) {
    return users;
  }
  for (const item of items) {
    users.push({
      firstName: item.first_name,
      lastName: item.last_name,
      alias: item.username,
      imageUrl: item.image_url,
    });
  }
  console.log("Batch get users result:", users);
  return users;
}

export class DynamoUserDAO implements UserDAO {
  private authTableName = "authentication";
  private client = DynamoDBDocumentClient.from(new DynamoDBClient({}));
  async GetUser(userAlias: string): Promise<UserDto | null> {
    const userdata = await getUserCommand(
      this.authTableName,
      userAlias,
      this.client
    );
    if (
      !userdata.Item ||
      !userdata.Item.first_name ||
      !userdata.Item.last_name ||
      !userdata.Item.username ||
      !userdata.Item.image_url
    ) {
      return null;
    }

    return {
      firstName: userdata.Item.first_name.S!,
      lastName: userdata.Item.last_name.S!,
      alias: userdata.Item.username.S!,
      imageUrl: userdata.Item.image_url.S!,
    };
  }
}
