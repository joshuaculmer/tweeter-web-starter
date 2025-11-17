import { TweeterResponse } from "./TweeterResponse";

export interface NumberResponse extends TweeterResponse {
  readonly Number: number;
}
