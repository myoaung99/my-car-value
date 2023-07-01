import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { User } from './users.entity';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { CurrentUserMiddleware } from 'src/middlewares/admin.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService, AuthService],
  controllers: [UsersController],
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CurrentUserMiddleware).forRoutes('*');
  }
}
