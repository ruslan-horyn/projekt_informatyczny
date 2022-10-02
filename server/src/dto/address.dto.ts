import { IsString, ValidateIf } from 'class-validator';
import { Address } from '../types';

export class AddressDto {
  @ValidateIf((o: Address) => !!o.id)
  @IsString()
  declare id: string;

  @IsString()
  declare state: string;

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
