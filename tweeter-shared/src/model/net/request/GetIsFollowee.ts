import { UserDto } from "../../dto/UserDto";

export interface GetIsFollowee {
  readonly token: string;
  readonly user: UserDto;
  readonly selectedUser: UserDto;
}
