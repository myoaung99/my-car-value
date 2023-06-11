import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(email: string, password: string) {
    const newUser = this.repo.create({ email, password });
    this.repo.save(newUser);
    return { data: { id: newUser.id, email: newUser.email } };
  }

  async find() {
    const allUsers = await this.repo.find();
    return allUsers;
  }

  async findOne(id: string) {
    const user = await this.repo.findOne({ where: { id: id } });
    return user;
  }

  async findOneByEmail(email: string) {
    const user = await this.repo.findOne({ where: { email: email } });
    return user;
  }

  async update(id: string, attrs: Partial<User>) {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }
    Object.assign(user, attrs);
    const updatedUser = await this.repo.save(user);
    return updatedUser;
  }

  async remove(id: string) {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.repo.remove(user);
  }
}
