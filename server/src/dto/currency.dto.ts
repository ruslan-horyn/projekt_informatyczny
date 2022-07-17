import { IsString } from 'class-validator';

export class CreateCurrencyDto {
  @IsString()
  declare public name: string;
}
