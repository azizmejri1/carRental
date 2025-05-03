import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, IsNumber, IsDate } from 'class-validator';

export class CreateCarDto {
  @IsNotEmpty()
  @IsString()
  model: string;

  @IsNotEmpty()
  @IsString()
  brand: string;

  @IsNotEmpty()
  @IsNumber()
  pricePerDay: number;

  @IsNotEmpty()
  @IsNumber()
  rentalCompanyId: number;
}

export class UpdateCarDto {
    @IsString()
    model?: string;
  
    @IsString()
    brand?: string;
  
    @IsNumber()
    pricePerDay?: number;

    @IsString()
    imageUrl?: string;
}

export class SearchCarDto{

  @IsString()
  location : string;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  pickUpDate : Date;
  
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  returnDate : Date;
}