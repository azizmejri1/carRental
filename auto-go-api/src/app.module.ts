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
import { ConfigModule, ConfigService } from '@nestjs/config';


@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true, // makes ConfigService available globally
    envFilePath: '.env', // optional, default is '.env'
  }),TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (config: ConfigService) => ({
      type: config.get<'postgres'>('DB_TYPE'),
      host: config.get<string>('DB_HOST'),
      port: config.get<number>('DB_PORT'),
      username: config.get<string>('DB_USERNAME'),
      password: config.get<string>('DB_PASSWORD'),
      database: config.get<string>('DB_NAME'),
      entities: [User, CarRentalCompany, Car, Reservation], // Entities
      synchronize: true, // WARNING: disable in production
    }),
  }),UserModule,ReservationModule,RentalCompanyModule,CarModule,AuthModule, MailModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
