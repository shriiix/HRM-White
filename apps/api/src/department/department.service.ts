import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service.js';
import { CreateDepartmentDto } from './dto/create-department.dto.js';

@Injectable()
export class DepartmentService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateDepartmentDto) {
    return this.prisma.department.create({
      data: {
        tenantId: dto.tenantId,
        name: dto.name,
        code: dto.code,
      },
    });
  }

  async findAll(tenantId: string) {
    return this.prisma.department.findMany({
      where: {
        tenantId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string, tenantId: string) {
    return this.prisma.department.findFirst({
      where: {
        id,
        tenantId,
      },
    });
  }
}