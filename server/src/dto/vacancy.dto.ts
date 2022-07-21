import {
  IsDate, IsString, ValidateIf,
} from 'class-validator';

import { Vacancy } from '../types';

export class CreateVacancyDto {
  @IsString()
  declare public name: string;

  @IsDate()
  declare public start: string;

  @ValidateIf((o: Vacancy) => typeof o.end === 'string' && o.end.length > 0)
  @IsDate()
  declare public end: string;

  @IsString()
  declare public salary: string;

  @IsString()
  declare public type: string;

  @IsString()
  declare public job: string;

  @IsString()
  declare public employee: string;

  @IsString()
  declare public currency: string;
}
