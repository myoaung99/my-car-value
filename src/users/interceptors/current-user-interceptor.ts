import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { UsersService } from '../users.service';

// This interceptor will be used to add the current user to the request object

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private usersService: UsersService) {}

  // Interceptor method to be executed before the request is handled
  intercept(
    context: ExecutionContext,
    handler: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const { userId } = request.session;

    if (userId) {
      // add request.currentUser, so that we can access it in the controller through Decorator (Current User Decorator)
      const user = this.usersService.findOne(userId);
      request.currentUser = user;
    }

    // Continue handling the request
    return handler.handle();
  }
}
