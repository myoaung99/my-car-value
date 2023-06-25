import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './reports.entity';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos/create-report.dto';

@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private reports: Repository<Report>) {}

  async create(report: CreateReportDto) {
    const _report = await this.reports.create(report);
    return this.reports.save(_report);
  }
}
