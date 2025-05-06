import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Type } from 'class-transformer';
import { CarRentalCompany } from './rental-company.entity';
import { RentalCompanyController } from './rental-company.controller';
import { RentalCompanyService } from './rental-company.service';
import { AuthService } from 'src/auth/auth.service';
import { AuthModule } from 'src/auth/auth.module';
import { ReservationModule } from 'src/reservation/reservation.module';
import { CarModule } from 'src/car/car.module';
import { MailModule } from 'src/mail/mail.module';

@Module({
    imports: [TypeOrmModule.forFeature([CarRentalCompany]),MailModule,AuthModule,ReservationModule,CarModule],
    controllers: [RentalCompanyController],
    providers: [RentalCompanyService],
})
export class RentalCompanyModule {}
