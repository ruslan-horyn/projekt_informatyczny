import { IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  declare public author: string;

  @IsString()
  declare public content: string;

  @IsString()
  declare public title: string;
}
