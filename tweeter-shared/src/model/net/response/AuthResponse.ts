import { AuthToken } from "../../domain/AuthToken";
import { Status } from "../../domain/Status";
import { UserDto } from "../../dto/UserDto";
import { TweeterResponse } from "./TweeterResponse";

export interface AuthResponse extends TweeterResponse {
  readonly UserDto: UserDto;
  readonly AuthToken: AuthToken;
}
