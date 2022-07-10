import { IsString } from 'class-validator';

export class AddressDto {
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
