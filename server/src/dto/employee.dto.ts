import { IsDate, IsEmail, IsString } from 'class-validator';

export class EmployeeDto {
  @IsString()
  declare firstName: string;

  @IsString()
  declare lastName: string;

  @IsString()
  declare phone: string;

  @IsString() @IsEmail()
  declare email: string;

  @IsString()
  declare passportSerialNumber: string;

  @IsString() @IsDate()
  declare visaStart: string;

  @IsString() @IsDate()
  declare visaEnd: string;
}
