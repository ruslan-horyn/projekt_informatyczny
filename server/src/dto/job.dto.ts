import { IsString } from 'class-validator';

export class CreateJobDto {
  @IsString()
  declare public name: string;

  @IsString()
  declare public description: string;

  @IsString()
  declare public phone: string;
}

export class CreateJobWithAddressDto extends CreateJobDto {
  @IsString()
  declare public city: string;

  @IsString()
  declare public zcode: string;

  @IsString()
  declare public street: string;

  @IsString()
  declare public house: string;

  @IsString()
  declare public local: string;
}
