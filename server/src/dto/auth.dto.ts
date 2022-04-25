import { IsString, IsEmail } from 'class-validator';

export class LoginDto {
  @IsString({
    message: 'Email is required',
  }) @IsEmail()
  // @ts-ignore
  public email: string;
  
  @IsString({
    message: 'Password is required',
  })
  // @ts-ignore
  public password: string;
}
