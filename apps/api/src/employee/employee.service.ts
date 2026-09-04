import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service.js';
import { CreateEmployeeDto } from './dto/create-employee.dto.js';

@Injectable()
export class EmployeeService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateEmployeeDto) {
    return this.prisma.employee.create({
      data: {
        tenantId: dto.tenantId,
        userId: dto.userId,
        employeeCode: dto.employeeCode,
        firstName: dto.firstName,
        lastName: dto.lastName,
        email: dto.email,
        phone: dto.phone,
        joiningDate: new Date(dto.joiningDate),
        status: dto.status ?? 'ACTIVE',
      },
    });
  }

  async findAll(tenantId: string) {
    return this.prisma.employee.findMany({
      where: {
        tenantId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string, tenantId: string) {
    return this.prisma.employee.findFirst({
      where: {
        id,
        tenantId,
      },
    });
  }
}