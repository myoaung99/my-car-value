import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './reports.entity';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos/create-report.dto';
import { User } from 'src/users/users.entity';

@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private reports: Repository<Report>) {}

  async create(report: CreateReportDto, user: User) {
    const _report = await this.reports.create(report);
    _report.user = user;
    return this.reports.save(_report);
  }

  async changeApproval(id: number, approved: boolean) {
    const report = await this.reports.findOne({ where: { id } });
    if (!report) {
      throw new NotFoundException('no report was found with given id');
    }

    report.approved = approved;
    return this.reports.save(report);
  }
}
