import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface ClassConstructor {
  new (...args: any[]): object;
}

// This decorator is used to serialize the response of the controller
export const Serialize = (dto: ClassConstructor) => {
  return UseInterceptors(new SerializeInterceptor(dto));
};

// This class is used to serialize the response of the controller
class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: ClassConstructor) {}
  intercept(
    context: ExecutionContext,
    handler: CallHandler<any>,
  ): Observable<any> {
    return handler.handle().pipe(
      map((data: any) => {
        return plainToInstance(this.dto, data, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}

/**
 * The purpose of this code is to provide a reusable interceptor for serializing the response data returned by a controller method. By applying the Serialize decorator to a controller method, the interceptor ensures that the response data is transformed into an instance of the specified DTO class, facilitating a consistent and controlled structure for the API response.

This approach helps separate concerns by handling serialization in a centralized manner, rather than duplicating serialization logic across multiple controller methods. It promotes maintainability, readability, and consistency in the codebase by enforcing a standard format for the API responses.

By utilizing the plainToInstance function from class-transformer, the code simplifies the transformation of plain JavaScript objects into instances of the specified DTO class, allowing for more structured and well-defined response payloads.
 */
