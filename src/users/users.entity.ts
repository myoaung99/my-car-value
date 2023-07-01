import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterInsert,
  AfterUpdate,
  AfterRemove,
  OneToMany,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Report } from 'src/reports/reports.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ default: true })
  admin: boolean;

  @OneToMany(() => Report, (report) => report.user)
  reports: Report[];

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
