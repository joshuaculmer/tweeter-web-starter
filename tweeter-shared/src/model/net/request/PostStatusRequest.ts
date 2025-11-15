import { TweeterRequest } from "./TweeterRequest";
export interface PostStatusRequest extends TweeterRequest {
  token: string;
  newStatus: string;
}
