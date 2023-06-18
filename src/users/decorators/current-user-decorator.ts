import { ExecutionContext, createParamDecorator } from '@nestjs/common';

// Create a parameter decorator called CurrentUser
export const CurrentUser = createParamDecorator(
  // The 'data' parameter is of type 'never', indicating that no arguments can be passed to this decorator from the controller layer
  (data: never, context: ExecutionContext) => {
    // Extract the request object from the execution context
    const request = context.switchToHttp().getRequest();

    // Return the request object's 'currentUser' property assigned
    // by CurrentUserInterceptor
    return request.currentUser;
  },
);
