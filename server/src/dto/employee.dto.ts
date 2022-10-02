import { IsDate, IsEmail, IsString } from 'class-validator';

export class EmployeeDto {
  @IsString()
  declare public firstName: string;

  @IsString()
  declare public lastName: string;

  @IsString()
  declare public phone: string;

  @IsString() @IsEmail()
  declare public email: string;

  @IsString()
  declare public passportSerialNumber: string;

  @IsString() @IsDate()
  declare public visaStart: string;

  @IsString() @IsDate()
  declare public visaEnd: string;
}
