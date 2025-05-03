import { Type } from "class-transformer";
import { IsEmail, IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";

export class UserDto {
    @IsString()
    name: string;
  
    @IsEmail()
    email: string;
  
    @IsString()
    @MinLength(6)
    password: string;
  }
  
export class ActivateUserDto {
    
    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    userId: number;

    @IsString()
    code :string;
}