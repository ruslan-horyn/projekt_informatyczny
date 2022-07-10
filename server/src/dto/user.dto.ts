import {
  ArrayUnique, IsArray, IsEmail, IsString,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  declare public firstName: string;

  @IsString()
  declare public lastName: string;

  @IsString() @IsEmail()
  declare public email: string;

  @IsString()
  declare public password: string;

  @IsString()
  declare public confirm: string;

  @IsArray() @ArrayUnique()
  declare public roles: string[];
}
