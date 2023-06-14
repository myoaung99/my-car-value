import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterInsert,
  AfterUpdate,
  AfterRemove,
} from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @AfterInsert()
  logAfterInsert() {
    console.log('Inserted User with id', this.id);
  }

  @AfterRemove()
  logAfterRemove() {
    console.log('Removed User with id', this.id);
  }

  @AfterUpdate()
  logAfterUpdate() {
    console.log('Updated User with id', this.id);
  }
}
