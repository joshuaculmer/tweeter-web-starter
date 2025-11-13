import { UserDto } from "../../dto/UserDto";

export interface GetIsFolloweeRequest {
  readonly token: string;
  readonly user: UserDto;
  readonly selectedUser: UserDto;
}
