import { IsString } from 'class-validator';

export class CreateJobDto {
  @IsString()
  declare public name: string;

  @IsString()
  declare public description: string;

  @IsString()
  declare public phone: string;
}
