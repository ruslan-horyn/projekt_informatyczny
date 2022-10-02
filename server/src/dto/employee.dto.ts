import { IsDateString, IsEmail, IsString } from 'class-validator';

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

  @IsDateString()
  declare visaStart: string;

  @IsDateString()
  declare visaEnd: string;
}
