import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signUp(email: string, password: string) {
    const user = await this.usersService.findOneByEmail(email);
    if (user) {
      throw new BadRequestException('User already exist');
    }

    const salt = randomBytes(8).toString('hex'); // random string and number
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    const result = salt + '.' + hash.toString('hex');

    const newUser = await this.usersService.create(email, result);
    return newUser;
  }

  async signIn(email: string, password: string) {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    const [salt, hashedPassword] = user.password.split('.');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (hashedPassword !== hash.toString('hex')) {
      throw new BadRequestException('Invalid password');
    }

    return user;
  }
}
