import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dtos/create-report.dto';
import { AuthGuard } from 'src/users/guards/auth.guard';
import { CurrentUser } from 'src/users/decorators/current-user-decorator';
import { User } from 'src/users/users.entity';
import { Serialize } from 'src/interceptors/serialize-interceptor';
import { ReportDto } from './dtos/reports.dto';
import { ApproveReportDto } from './dtos/approve-report.dto';
import { AdminGuard } from './guards/admin.guard';
import { GetReportsDto } from './dtos/get-reports.dto';

@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Post()
  @UseGuards(AuthGuard)
  @Serialize(ReportDto)
  createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
    return this.reportsService.create(body, user);
  }

  @Patch(':id')
  @UseGuards(AdminGuard)
  approveReport(@Param('id') id: string, @Body() body: ApproveReportDto) {
    return this.reportsService.changeApproval(+id, body.approved);
  }

  @Get()
  getEstimate(@Query() query: GetReportsDto) {
    console.log('query =>', query);
  }
}
