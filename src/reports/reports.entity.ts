import {
  IsLatitude,
  IsLongitude,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}
