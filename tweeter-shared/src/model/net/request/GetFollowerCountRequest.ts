import { TweeterRequest } from "./TweeterRequest";
export interface GetFollowerCountRequest extends TweeterRequest {
  alias: string;
}
