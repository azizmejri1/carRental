import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';

export class CreateRentalCompanyDto {
  
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  location: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;
}

export class companyStatistcs{
  numberOfCars : number;
  numberOfReservations : number;
  numberOfClients : number;
  totalRevenue : number;
}
export class ActivateCompanyDto {
    
    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    userId: number;

    @IsString()
    code :string;
}