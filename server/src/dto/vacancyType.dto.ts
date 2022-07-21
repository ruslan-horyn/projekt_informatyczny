import { IsString } from 'class-validator';

export class CreateVacancyTypeDto {
  @IsString()
  declare public name: string;
}
