import { TweeterResponse } from "tweeter-shared";
import { AuthService } from "../../model/service/AuthService";
import { LogoutRequest } from "tweeter-shared/src/model/net/request/LogoutRequest";
import { tryCatchWrapper } from "../LambdaHelper";
import { FakeAuthDAO } from "../../model/dao/FakeDataDao/FakeAuthDAO";
import { DynamoAuthDAO } from "../../model/dao/DynamoDao/DynamoAuthDAO";

const authDao = new DynamoAuthDAO();
export const handler = async (
  LogoutRequest: LogoutRequest
): Promise<TweeterResponse> => {
  const authService = new AuthService(authDao);
  return tryCatchWrapper(authService.logout, LogoutRequest, "Logout Lambda");
};
