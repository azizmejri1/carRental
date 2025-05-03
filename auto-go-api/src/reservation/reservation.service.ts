import { Injectable, NotFoundException, ConflictException, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation } from './reservation.entity';
import { Car } from 'src/car/car.entity';
import { CreateReservationDto, ReservationDto } from './reservationDto';
import { User } from 'src/user/user.entity';
import { CarRentalCompany } from 'src/rental-company/rental-company.entity';
import { totalmem } from 'os';
@Injectable()
export class ReservationService {
    
    constructor(
        @InjectRepository(Reservation)
        private reservationRepository: Repository<Reservation>,
        @InjectRepository(Car)
        private carRepository: Repository<Car>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(CarRentalCompany) 
        private companyRespository : Repository<CarRentalCompany>
      ) {}
    
      async createReservation(createReservationDto: CreateReservationDto): Promise<Reservation> {
        const { carId, startDate, endDate, userId,totalPrice } = createReservationDto;
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new NotFoundException(`User with ID ${userId} not found`);
        }
        const car = await this.carRepository.findOne({ where: { id: carId } });
        if (!car) {
          throw new NotFoundException(`Car with ID ${carId} not found`);
        }
        
        const overlappingReservations = await this.reservationRepository.createQueryBuilder('reservation')
          .where('reservation.carId = :carId', { carId })
          .andWhere('(reservation.startDate BETWEEN :startDate AND :endDate OR reservation.endDate BETWEEN :startDate AND :endDate)', { startDate, endDate })
          .getCount();
        
        if (overlappingReservations > 0) {
          throw new ConflictException('Car is already reserved for the selected dates');
        }
        
        try {
          const reservation = this.reservationRepository.create({ user,car, startDate, endDate,totalPrice });
          return await this.reservationRepository.save(reservation);
        } catch (error) {
          console.error(error);
          throw new InternalServerErrorException('Unexpected error occurred');
        }
      }
    
      async updateReservation(id: number, updateReservationDto: Partial<CreateReservationDto>): Promise<Reservation> {
        const { carId, startDate, endDate, userId,totalPrice } = updateReservationDto;
        const reservation = await this.reservationRepository.findOne({ where: { id } });
        if (!reservation) {
          throw new NotFoundException(`Reservation with ID ${id} not found`);
        }

        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new NotFoundException(`User with ID ${userId} not found`);
        }
        const car = await this.carRepository.findOne({ where: { id: carId } });
        if (!car) {
          throw new NotFoundException(`Car with ID ${carId} not found`);
        }
    
        if (updateReservationDto.startDate && updateReservationDto.endDate) {
          const overlappingReservations = await this.reservationRepository.createQueryBuilder('reservation')
            .where('reservation.carId = :carId', { carId: reservation.car.id })
            .andWhere('reservation.id != :id', { id })
            .andWhere('(reservation.startDate BETWEEN :startDate AND :endDate OR reservation.endDate BETWEEN :startDate AND :endDate)', {
              startDate: updateReservationDto.startDate,
              endDate: updateReservationDto.endDate,
            })
            .getCount();
          
          if (overlappingReservations > 0) {
            throw new ConflictException('Car is already reserved for the selected dates');
          }
        }
    
        Object.assign(reservation, updateReservationDto);
        return this.reservationRepository.save(reservation);
      }
    
      async delete(id: number): Promise<void> {
        const result = await this.reservationRepository.delete(id);
        if (result.affected === 0) {
          throw new NotFoundException(`Reservation with ID ${id} not found`);
        }
      }

      async getReservationByCarId(id: number) : Promise<CreateReservationDto[]> {
        const car = await this.carRepository.findOne({ where: { id } });
        if (!car) {
          throw new NotFoundException(`Car with ID ${id} not found`);
        }
        const reservations = await this.reservationRepository.find({
          where: { car: { id } },
          relations: ['car', 'user'], // important pour avoir accès à car.id et user.id
        });
        const reservationsDto = reservations.map(reservation => {
          return {
            id: reservation.id,
            carId: reservation.car.id,
            userId: reservation.user.id,
            startDate: reservation.startDate,
            endDate: reservation.endDate,
            totalPrice : reservation.totalPrice,
          };
        });
        return reservationsDto;


    }

    async getReservationsByCompany(id: number) {
      const reservations = await this.reservationRepository.find({
        relations: ['car', 'car.company', 'user'], // preload car.company too
      });
    
      if (reservations.length === 0) {
        throw new NotFoundException("no reservation found");
      }
    
      const returnedReservations: ReservationDto[] = [];
    
      for (const reservation of reservations) {
        if (reservation.car.company.id === id) {
          returnedReservations.push({
            id: reservation.id,
            carId: reservation.car.id,
            userId: reservation.user.id,
            startDate: reservation.startDate,
            endDate: reservation.endDate,
            totalPrice : reservation.totalPrice,
          });
        }
      }
    
      return returnedReservations;
    }
    
    
}
