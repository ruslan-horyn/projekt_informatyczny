import { IsString } from 'class-validator';

export class CreateJobDto {
  @IsString()
  // @ts-ignore
  public password: string;

  @IsString()
  // @ts-ignore
  public description: string;

  @IsString()
  // @ts-ignore
  public phone: string;

  @IsString()
  // @ts-ignore
  public location: string;

  @IsString()
  // @ts-ignore
  public zcode: string;

  @IsString()
  // @ts-ignore
  public street: string;

  @IsString()
  // @ts-ignore
  public house: string;

  @IsString()
  // @ts-ignore
  public local: string;

  @IsString()
  // @ts-ignore
  private name: string;
}
