import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Car } from './car.entity';
import { CreateCarDto, SearchCarDto, UpdateCarDto } from './carDto';
import { CarRentalCompany } from 'src/rental-company/rental-company.entity';
import { Reservation } from 'src/reservation/reservation.entity';
@Injectable()
export class CarService {
    constructor(
        @InjectRepository(Car)
        private readonly carRepository: Repository<Car>,
        @InjectRepository(CarRentalCompany)
        private readonly rentalCompanyRepository: Repository<CarRentalCompany>,
        @InjectRepository(Reservation) private readonly reservationRepository : Repository<Reservation>,
      ) {}
    
      async create(createCarDto: CreateCarDto , filename : string): Promise<Car> {
        const {model,brand,pricePerDay,rentalCompanyId} = createCarDto;
        const rentalCompany = await this.rentalCompanyRepository.findOne({ where: { id: rentalCompanyId } });
        if (!rentalCompany) {
            throw new NotFoundException(`Rental company with ID ${rentalCompanyId} not found`);
        }
        const car = new Car();
        car.model = model;
        car.brand = brand;
        car.pricePerDay = pricePerDay;
        car.company = rentalCompany;
        car.imageUrl = filename;
        return this.carRepository.save(car);
      }
    
      async update(id: number, updateCarDto: UpdateCarDto,filename : string): Promise<Car> {
        updateCarDto.imageUrl = filename;
        const car = await this.carRepository.findOne({ where: { id } });
        if (!car) {
          throw new NotFoundException(`Car with ID ${id} not found`);
        }
        Object.assign(car, updateCarDto);
        return this.carRepository.save(car);
      }
    
      async delete(id: number): Promise<void> {
        const car = await this.carRepository.findOne({where : {id}})
        if(!car){
          throw new NotFoundException(`Car with ID ${id} not found`);
        }
        const reservations = await this.reservationRepository.find({where : {car }})
        if(reservations){
          reservations.forEach(async (reservation,index)=>{
            await this.reservationRepository.delete(reservation.id);
          })
        }
        const result = await this.carRepository.delete(id);
        
      }

      async findAll(): Promise<Car[]> {
        return this.carRepository.find();
      }
      async findByCarId(id: number): Promise<Car> {
        const car = await this.carRepository.findOne({ where: { id } });
        if (!car) {
          throw new NotFoundException(`Car with ID ${id} not found`);
        }
        return car;
      }
      
      async findByCompany(id: number): Promise<Car[]> {
        const rentalCompany = await this.rentalCompanyRepository.findOne({ where: { id } });
        if (!rentalCompany) {
          throw new NotFoundException(`Rental company with ID ${id} not found`);
        }
        return this.carRepository.find({ where: { company: rentalCompany } });
      }

      async findCarsByDate(searchCarDto : SearchCarDto){
        const {location , pickUpDate , returnDate} = searchCarDto;
        const cars = await this.carRepository.find({relations: ['company']});
        const availaibleCars : Car[] = [];
        cars.forEach((car)=>{
          const reservations : Reservation[] = car.reservations;
          let available = true;
          if(reservations){
            reservations.forEach((reservation)=>{
              if((reservation.startDate <= pickUpDate && reservation.endDate >= pickUpDate) || (reservation.startDate >= pickUpDate || reservation.startDate <= returnDate)){
                available = false;
              }
            })
          }
          if(car.company.location != location){
            available = false;
          }
          if(available){
            availaibleCars.push(car);
          }

        })
        return availaibleCars;
      }
        
       

}
