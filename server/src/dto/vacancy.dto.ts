import {
  IsDate, IsString, ValidateIf,
} from 'class-validator';

import { Vacancy } from '../types';

export class CreateVacancyDto {
  @IsString()
  declare name: string;

  @IsDate()
  declare start: string;

  @ValidateIf((o: Vacancy) => typeof o.end === 'string' && o.end.length > 0)
  @IsDate()
  declare end: string;

  @IsString()
  declare salary: string;

  @IsString()
  declare type: string;

  @IsString()
  declare job: string;

  @IsString()
  declare employee: string;

  @IsString()
  declare currency: string;
}
