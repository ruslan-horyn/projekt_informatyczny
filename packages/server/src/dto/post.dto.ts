import { IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  declare author: string;

  @IsString()
  declare content: string;

  @IsString()
  declare title: string;
}
