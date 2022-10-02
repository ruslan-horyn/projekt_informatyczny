import { IsString } from 'class-validator';

export class CurrencyDto {
  @IsString()
  declare public name: string;
}
