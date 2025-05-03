import { Car } from 'src/car/car.entity';
import { User } from 'src/user/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.reservations)
  user: User;

  @ManyToOne(() => Car, (car) => car.reservations)
  car: Car;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column()
  totalPrice : number;
}