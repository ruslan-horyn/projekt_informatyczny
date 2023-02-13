import { IsString } from 'class-validator';

export class AddressDto {
  @IsString()
  declare house: string;

  @IsString()
  declare local: string;

  @IsString()
  declare street: string;

  @IsString()
  declare city: string;

  @IsString()
  declare postalCode: string;

  @IsString()
  declare country: string;

  @IsString()
  declare region: string;

  @IsString()
  declare district: string;
}
