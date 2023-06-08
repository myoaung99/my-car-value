import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReportsModule } from './reports/reports.module';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { ReportsController } from './reports/reports.controller';

@Module({
  imports: [ReportsModule, UsersModule],
  controllers: [AppController, UsersController, ReportsController],
  providers: [AppService],
})
export class AppModule {}
