import { Injectable, NotFoundException, ConflictException, Res, Request } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CarRentalCompany } from './rental-company.entity';
import { ActivateCompanyDto, CreateRentalCompanyDto } from './rentalCompanyDto';
import * as bcrypt from 'bcrypt';
import { AuthService } from 'src/auth/auth.service';
import { Response } from 'express';
import { Reservation } from 'src/reservation/reservation.entity';
import { ReservationService } from 'src/reservation/reservation.service';
import { CarService } from 'src/car/car.service';
import { ReservationDto } from 'src/reservation/reservationDto';
import { MailService } from 'src/mail/mail.service';
import { ActivateUserDto } from 'src/user/userDto';


@Injectable()
export class RentalCompanyService {
    constructor(
        @InjectRepository(CarRentalCompany)
        private readonly rentalCompanyRepository: Repository<CarRentalCompany>,
        private readonly authService: AuthService,
        private readonly reservationService : ReservationService,
        private readonly carService : CarService,
        private readonly mailService : MailService
      ) {}
    
      async create(createRentalCompanyDto: CreateRentalCompanyDto,@Res() res: Response) {
        const {name , location, email, password } = createRentalCompanyDto;
        const existingCompany = await this.rentalCompanyRepository.findOne({ where: { email: createRentalCompanyDto.email } });
        if (existingCompany) {
          throw new ConflictException('Email already exists');
        }
        const saltOrRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltOrRounds);
        const rentalCompany = this.rentalCompanyRepository.create({...createRentalCompanyDto, password: hashedPassword});
        await this.rentalCompanyRepository.save(rentalCompany);
        const code  = await this.getActivationCode(rentalCompany);
        await this.sendActivationCode(email,code,name);
        await this.authService.login({email, password,role:'admin'}, res);
      }
    
      async update(id: number, updateRentalCompanyDto: Partial<CreateRentalCompanyDto>): Promise<CarRentalCompany> {
        const rentalCompany = await this.rentalCompanyRepository.findOne({ where: { id } });
    
        if (!rentalCompany) {
          throw new NotFoundException(`Rental company with ID ${id} not found`);
        }
    
        Object.assign(rentalCompany, updateRentalCompanyDto);
        return this.rentalCompanyRepository.save(rentalCompany);
      }
    
      async delete(id: number): Promise<void> {
        const result = await this.rentalCompanyRepository.delete(id);
    
        if (result.affected === 0) {
          throw new NotFoundException(`Rental company with ID ${id} not found`);
        }
      }

      async getCurrentRentalCompany(@Request() req): Promise<CarRentalCompany|null> {
        const id = req.user.sub;
        const carRentalCompany = this.rentalCompanyRepository.findOne({where : {id}});
        if(!carRentalCompany){
          throw new NotFoundException('no rental company found');
        }
        return carRentalCompany;

      }

      async getCompanyStatistics(id:number){
        const reservations = await this.reservationService.getReservationsByCompany(id);
        const numberOfReservations = reservations.length;
        const numberOfCars = await this.getNumberOfCarsByCompany(id);
        const numberOfClients = await this.getNumberOfClients(reservations);
        const totalRevenue = await this.getTotalRevenue(reservations);
        return {numberOfReservations:numberOfReservations,numberOfCars:numberOfCars,numberOfClients:numberOfClients,totalRevenue:totalRevenue};

      }
      async getNumberOfCarsByCompany(id : number){
        const cars = await this.carService.findByCompany(id);
        return cars.length;
      }

      async getTotalRevenue(reservations : ReservationDto[]){
        let totalRevenue = 0;
        for(const reservation of reservations){
          totalRevenue += reservation.totalPrice;
        }
        return totalRevenue;
      }

      async getNumberOfClients(reservations : ReservationDto[]){
        let numberOfClients = 0;
        const clientIds : number[] = []
        for(const reservation of reservations){
          if(!clientIds.includes(reservation.userId)){
            clientIds.push(reservation.userId);
          }
        }
        return clientIds.length;
      }
      async getActivationCode(rentalCompany : CarRentalCompany) : Promise<string>{
            const length = 6;
            const code = Math.floor(Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1)).toString();
            rentalCompany.activationCode = code;
            rentalCompany.activationCodeExpiration = new Date(Date.now() + 15 * 60 * 1000);
            await this.rentalCompanyRepository.save(rentalCompany);
            return code;
          }
      
          async sendActivationCode(email:string,code:string,name:string){
            const subject : string = "Account activation"
            const text : string = "your code is : " + code;
            const htmlTemplate = `
            <!DOCTYPE html>
            <html>
            <head>
              <meta charset="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
              <title>Email</title>
              <style>
                body {
                  font-family: Arial, sans-serif;
                  background-color: #f4f4f4;
                  padding: 20px;
                }
                .email-container {
                  max-width: 600px;
                  margin: auto;
                  background-color: #ffffff;
                  padding: 30px;
                  border-radius: 8px;
                  box-shadow: 0 0 5px rgba(0,0,0,0.1);
                }
                .header {
                  text-align: center;
                  font-size: 24px;
                  color: #333333;
                }
                .content {
                  font-size: 16px;
                  color: #555555;
                  line-height: 1.5;
                  margin-top: 20px;
                }
                .footer {
                  text-align: center;
                  font-size: 12px;
                  color: #aaaaaa;
                  margin-top: 30px;
                }
                .code-box {
                  background-color: #f0f0f0;
                  border-radius: 4px;
                  padding: 10px;
                  font-weight: bold;
                  font-size: 20px;
                  color: #000;
                  letter-spacing: 2px;
                  text-align: center;
                  margin: 20px 0;
                }
              </style>
            </head>
            <body>
              <div class="email-container">
                <div class="header">Welcome to AutoGo!</div>
                <div class="content">
                  <p>Hi {{username}},</p>
                  <p>Thank you for registering. Please use the code below to verify your email address:</p>
                  <div class="code-box">{{verificationCode}}</div>
                  <p>This code will expire in 15 minutes.</p>
                  <p>If you didn't request this, please ignore this email.</p>
                </div>
                <div class="footer">
                  &copy; 2025 AutoGo. All rights reserved.
                </div>
              </div>
            </body>
            </html>
            `;
            const finalHtml = htmlTemplate
            .replace('{{username}}', name)
            .replace('{{verificationCode}}', code);
            await this.mailService.sendMail(email,subject,text,finalHtml);
          }
      
          async verifyActivationCode(activateCompanyDto : ActivateUserDto,@Request() req) {
            const {userId ,code } = activateCompanyDto;
            const user = await this.rentalCompanyRepository.findOne({where : {id: userId}});
            if(user?.activationCode == code){
              user.activated = true;
              await this.rentalCompanyRepository.save(user);
              req['user'].activated = true;
              return true;
            }
            return false;
          }
      
          async accountActivated(id : number){
            const company = await this.rentalCompanyRepository.findOne({where : {id}});
            if(!company){
              throw new NotFoundException(`company with ID ${id} not found`);
            }
            return company.activated;
          }
}
