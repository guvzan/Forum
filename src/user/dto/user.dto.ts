import { Exclude, Expose } from 'class-transformer';


@Exclude()
export class UserDto{
  @Expose()
  id: number;

  @Expose()
  name?: string;

  @Expose()
  email: string;

  @Expose()
  roleId: number;

  @Expose()
  avatar?: string;

  @Expose()
  isActivated: boolean;

  @Expose()
  lastLogin: Date;

  @Expose()
  createdAt: Date;
}