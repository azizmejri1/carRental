import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constant';
import { User } from 'src/user/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarRentalCompany } from 'src/rental-company/rental-company.entity';

@Module({
  imports:[JwtModule.register({
    global: true,
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '7d' },
  }),TypeOrmModule.forFeature([User]),TypeOrmModule.forFeature([CarRentalCompany]),],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
