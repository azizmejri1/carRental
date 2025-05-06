import { Type } from "class-transformer";
import { IsEmail, IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";

export class UserDto {
    @IsString()
    name: string;

    @IsString()
    firstName : string;

    @IsString()
    lastName : string;
  
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

export class UpdatePasswordDto{

    @IsString()
    oldPassword : string;

    @IsString()
    newPassword : string;
}