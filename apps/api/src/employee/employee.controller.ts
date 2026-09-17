import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { EmployeeService } from './employee.service.js';
import { CreateEmployeeDto } from './dto/create-employee.dto.js';

import { JwtAuthGuard } from '../auth/guards/jwt-auth/jwt-auth.guard.js';
import { TenantGuard } from '../auth/guards//tenant/tenant.guard.js';

@Controller('employees')
@UseGuards(JwtAuthGuard, TenantGuard)
export class EmployeeController {
  constructor(
    private readonly employeeService: EmployeeService,
  ) {}

  @Post()
  create(
    @Body() dto: CreateEmployeeDto,
    @Req() req: any,
  ) {
    return this.employeeService.create(
      dto,
      req.tenantId,
    );
  }

  @Get()
  findAll(@Req() req: any) {
    return this.employeeService.findAll(
      req.tenantId,
    );
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
    @Req() req: any,
  ) {
    return this.employeeService.findOne(
      id,
      req.tenantId,
    );
  }
}