import { CarRentalCompany } from 'src/rental-company/rental-company.entity';
import { Reservation } from 'src/reservation/reservation.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';


@Entity()
export class Car {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  model: string;

  @Column()
  brand: string;

  @Column()
  pricePerDay: number;

  @Column()
  imageUrl: string;

  @ManyToOne(() => CarRentalCompany, (company) => company.cars)
  company: CarRentalCompany;

  @OneToMany(() => Reservation, (reservation) => reservation.car)
  reservations: Reservation[];
}