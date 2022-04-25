import { IsString } from 'class-validator';

class CreateRoleDto {
  @IsString()
  // @ts-ignore
  public name: string;
}

export default CreateRoleDto;
