import { Car } from 'src/car/car.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';

@Entity()
export class CarRentalCompany {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  location: string;

  @Column({ default: false })
  activated : boolean;

  @Column({default : null})
  activationCode : string;

  @Column({default : null})
  activationCodeExpiration : Date;

  @Column({default : null})
  passwordResetCode : string;

  @Column({default : null})
  passwordResetCodeExpiration : Date;
  
  @OneToMany(() => Car, (car) => car.company)
  cars: Car[];
}