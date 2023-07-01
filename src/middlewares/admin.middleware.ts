import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/users.entity';

declare global {
  namespace Express {
    interface Request {
      currentUser?: User;
    }
  }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private readonly usersService: UsersService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    //@ts-ignore
    const { userId } = req.session || {};
    if (userId) {
      const user = await this.usersService.findOne(userId);
      if (user) {
        req.currentUser = user;
      }
    }
    next();
  }
}
