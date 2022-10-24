import {
  IsDateString, IsString, ValidateIf,
} from 'class-validator';

import { Vacancy } from '../types';

export class CreateVacancyDto {
  @IsString()
  declare name: string;

  @IsDateString()
  declare start: string;

  @ValidateIf(({ end }: Vacancy) => typeof end === 'string')
  @IsDateString()
  declare end: string;

  @IsString()
  declare salary: string;

  @IsString()
  declare typeId: string;

  @IsString()
  declare jobId: string;

  @IsString()
  declare employeeId: string;

  @IsString()
  declare currencyId: string;
}
