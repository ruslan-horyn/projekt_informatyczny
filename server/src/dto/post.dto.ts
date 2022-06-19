import { IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  // @ts-ignore
  public author: string;
  
  @IsString()
  // @ts-ignore
  public content: string;
  
  @IsString()
  // @ts-ignore
  public title: string;
}
