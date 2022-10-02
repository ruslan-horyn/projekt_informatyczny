import { IsString } from 'class-validator';

export class RoleDto {
  @IsString()
  declare name: string;
}
