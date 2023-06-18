// eslint-disable-next-line max-classes-per-file
import { Type } from 'class-transformer';
import { IsDefined, IsString } from 'class-validator';
import { Address } from '../types';
import { AddressDto } from './address.dto';

export class JobDto {
  @IsString()
  declare name: string;

  @IsString()
  declare description: string;

  @IsString()
  declare phone: string;
}

export class JobWithAddressDto extends JobDto {
  @IsDefined()
  @Type(() => AddressDto)
  declare address: Address;
}
