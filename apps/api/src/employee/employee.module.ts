import { Module } from '@nestjs/common';

import { EmployeeController } from './employee.controller.js';
import { EmployeeService } from './employee.service.js';

import { PrismaService } from '../database/prisma.service.js';
import { AuthModule } from '../auth/auth.module.js';

@Module({
  imports: [AuthModule],
  controllers: [EmployeeController],
  providers: [EmployeeService, PrismaService],
})
export class EmployeeModule {}