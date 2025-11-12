import { UserDto } from "../../dto/UserDto";

export interface GetIsFollower {
  readonly token: string;
  readonly user: UserDto;
  readonly selectedUser: UserDto;
}
