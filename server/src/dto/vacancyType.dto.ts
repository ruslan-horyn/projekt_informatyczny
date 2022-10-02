import { IsString } from 'class-validator';

export class CreateVacancyTypeDto {
  @IsString()
  declare name: string;
}
