import { IsEmail, IsString } from 'class-validator';

export class AuthDto {
  @IsEmail()
  declare public email: string;

  @IsString({
    message: 'Password is required',
  })
  declare public password: string;
}
