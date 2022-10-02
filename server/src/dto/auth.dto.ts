import { IsDefined, IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @IsDefined() @IsEmail()
  declare public email: string;

  @IsDefined() @IsString()
  declare public password: string;
}
