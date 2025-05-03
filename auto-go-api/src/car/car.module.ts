import { Module } from '@nestjs/common';
import { Type } from 'class-transformer';
import { Car } from './car.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarController } from './car.controller';
import { CarService } from './car.service';
import { CarRentalCompany } from 'src/rental-company/rental-company.entity';
import { Reservation } from 'src/reservation/reservation.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Car,CarRentalCompany,Reservation])], // Add your entities here
    controllers: [CarController],
    providers: [CarService],
    exports: [CarService],
})
export class CarModule {}
