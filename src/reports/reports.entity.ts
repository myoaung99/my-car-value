import {
  IsLatitude,
  IsLongitude,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { User } from 'src/users/users.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @Column()
  make: string;

  @IsString()
  @Column()
  model: string;

  @IsNumber()
  @Min(1930)
  @Max(2050)
  @Column()
  year: number;

  @IsLatitude()
  @Column()
  lat: number;

  @IsLongitude()
  @Column()
  lon: number;

  @IsNumber()
  @Min(0)
  @Max(1000000)
  @Column()
  mileage: number;

  @IsNumber()
  @Min(0)
  @Max(10000000)
  @Column()
  price: number;

  @Column({ default: false })
  approved: boolean;

  @ManyToOne(() => User, (user) => user.reports)
  user: User;
}
