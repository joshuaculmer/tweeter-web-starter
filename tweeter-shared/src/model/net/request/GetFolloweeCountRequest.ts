import { TweeterRequest } from "./TweeterRequest";
export interface GetFolloweeCountRequest extends TweeterRequest {
  alias: string;
}
