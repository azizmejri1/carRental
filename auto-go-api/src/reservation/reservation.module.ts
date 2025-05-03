import { Module } from '@nestjs/common';
import { ReservationController } from './reservation.controller';
import { ReservationService } from './reservation.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from './reservation.entity';
import { Car } from 'src/car/car.entity';
import { User } from 'src/user/user.entity';
import { CarRentalCompany } from 'src/rental-company/rental-company.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation,Car,User,CarRentalCompany])], // Add your entities here
  controllers: [ReservationController],
  providers: [ReservationService],
  exports:[ReservationService],
})
export class ReservationModule {}
