import { Reservation } from 'src/reservation/reservation.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany  } from 'typeorm';


@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

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

  @OneToMany(() => Reservation, (reservation) => reservation.user)
  reservations: Reservation[];
}