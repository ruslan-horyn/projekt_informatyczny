import {
  ArrayUnique, IsArray, IsEmail, IsString,
} from 'class-validator';

export class UserDto {
  @IsString()
  declare firstName: string;

  @IsString()
  declare lastName: string;

  @IsString() @IsEmail()
  declare email: string;

  @IsString()
  declare password: string;

  @IsString()
  declare confirm: string;

  @IsArray() @ArrayUnique()
  declare roles: string[];
}
