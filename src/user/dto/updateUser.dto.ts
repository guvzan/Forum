import {
  IsString,
  IsOptional,
  MinLength,
  MaxLength,
  Matches
} from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  @Matches(/^[a-zA-Z0-9]*$/, {
    message: 'Username can only contain letters and numbers',
  })
  name?: string;

  @IsOptional()
  @IsString()
  avatar?: string;
}
