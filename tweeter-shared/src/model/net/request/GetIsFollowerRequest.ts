import { UserDto } from "../../dto/UserDto";

export interface GetIsFollowerRequest {
  readonly token: string;
  readonly user: UserDto;
  readonly selectedUser: UserDto;
}
