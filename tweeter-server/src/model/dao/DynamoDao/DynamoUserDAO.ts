import { FakeData, User, UserDto } from "tweeter-shared";
import { UserDAO } from "../UserDAO";
import {
  DynamoDBClient,
  GetItemCommand,
  GetItemCommandOutput,
} from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

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
