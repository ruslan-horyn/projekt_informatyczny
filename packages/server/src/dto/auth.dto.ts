import { IsDefined, IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @IsDefined() @IsEmail()
  declare email: string;

  @IsDefined() @IsString()
  declare password: string;
}
