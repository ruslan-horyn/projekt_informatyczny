import {
  ArrayUnique, IsArray, IsEmail, IsString,
} from 'class-validator';

class CreateUserDto {
  @IsString()
  // @ts-ignore
  public firstName: string;
  
  @IsString()
  // @ts-ignore
  public lastName: string;
  
  @IsString() @IsEmail()
  // @ts-ignore
  public email: string;
  
  @IsString()
  // @ts-ignore
  public password: string;
  
  @IsString()
  // @ts-ignore
  public confirm: string;
  
  @IsArray() @ArrayUnique()
  // @ts-ignore
  public roles: string[];
}

export default CreateUserDto;
