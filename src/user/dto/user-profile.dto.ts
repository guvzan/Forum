import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UserProfileDto {
  @Expose()
  id: number

  @Expose()
  name?: string

  @Expose()
  email: string

  @Expose()
  roleId: number

  @Expose()
  avatar: string

  @Expose()
  isActivated: boolean

  @Expose()
  lastLogin: Date

  @Expose()
  createdAt: Date

  @Expose()
  posts: Array<object>

  @Expose()
  comments: Array<object>

  @Expose()
  postLikes: Array<object>

  @Expose()
  commentLikes: Array<object>
}