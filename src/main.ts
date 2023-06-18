import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
const cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuring cookie session middleware
  // This middleware configures a cookie-based session
  app.use(
    cookieSession({
      name: 'session',
      keys: ['myomyintaung'],
    }),
  );

  // Configuring global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  // Start the application on port 3000
  await app.listen(3000);
}

bootstrap();
