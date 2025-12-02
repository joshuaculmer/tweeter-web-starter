import { FakeData, User, UserDto } from "tweeter-shared";
import { UserDAO } from "../UserDAO";
import { DynamoDBClient, GetItemCommand } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

export class DynamoUserDAO implements UserDAO {
  private authTableName = "authentication";
  private client = DynamoDBDocumentClient.from(new DynamoDBClient({}));
  async GetUser(userAlias: string): Promise<UserDto | null> {
    const getUserCommand = {
      TableName: this.authTableName,
      Key: {
        username: { S: userAlias },
      },
    };
    const userdata = await this.client.send(new GetItemCommand(getUserCommand));

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
