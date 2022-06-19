import { IsString } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  declare public name: string;
}
