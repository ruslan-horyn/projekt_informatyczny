import { Type } from 'class-transformer';
import { IsDefined, IsObject, IsString } from 'class-validator';
import { Address } from '../types';
import { AddressDto } from './address.dto';

export class JobDto {
  @IsString()
  declare public name: string;

  @IsString()
  declare public description: string;

  @IsString()
  declare public phone: string;
}

export class JobWithAddressDto {
  @IsString()
  declare public name: string;

  @IsString()
  declare public description: string;

  @IsString()
  declare public phone: string;

  @IsDefined() @IsObject()
  @Type(() => AddressDto)
  declare public address: Address;
}
