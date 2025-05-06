import { Injectable, NotFoundException, ConflictException, Res, Request } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CarRentalCompany } from './rental-company.entity';
import { CreateRentalCompanyDto } from './rentalCompanyDto';
import * as bcrypt from 'bcrypt';
import { AuthService } from 'src/auth/auth.service';
import { Response } from 'express';
import { Reservation } from 'src/reservation/reservation.entity';
import { ReservationService } from 'src/reservation/reservation.service';
import { CarService } from 'src/car/car.service';
import { ReservationDto } from 'src/reservation/reservationDto';


@Injectable()
export class RentalCompanyService {
    constructor(
        @InjectRepository(CarRentalCompany)
        private readonly rentalCompanyRepository: Repository<CarRentalCompany>,
        private readonly authService: AuthService,
        private readonly reservationService : ReservationService,
        private readonly carService : CarService
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
}
