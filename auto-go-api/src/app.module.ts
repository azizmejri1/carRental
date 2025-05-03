import { Module, Res } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { CarRentalCompany } from './rental-company/rental-company.entity';
import { Car } from './car/car.entity';
import { Reservation } from './reservation/reservation.entity';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { RentalCompanyModule } from './rental-company/rental-company.module';
import { ReservationModule } from './reservation/reservation.module';
import { CarModule } from './car/car.module';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';


@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',       // Database type
    host: 'localhost',      // PostgreSQL host
    port: 5432,             // Default PostgreSQL port
    username: 'postgres',   // Your database username
    password: 'aziz2003',   // Your database password
    database: 'car_rental', // Your database name
    entities: [User, CarRentalCompany, Car, Reservation], // Entities
    synchronize: true,      // Auto-sync database schema (disable in production)
  }),UserModule,ReservationModule,RentalCompanyModule,CarModule,AuthModule, MailModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
