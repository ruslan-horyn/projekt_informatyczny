import { IsString } from 'class-validator';
import { Address } from '../types';

export class JobDto {
  @IsString()
  declare name: string;

  @IsString()
  declare description: string;

  @IsString()
  declare phone: string;
}

export class JobWithAddressDto extends JobDto {
  @IsString()
  declare address: Address;
}
