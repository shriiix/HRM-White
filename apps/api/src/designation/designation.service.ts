import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service.js';
import { CreateDesignationDto } from './dto/create-designation.dto.js';

@Injectable()
export class DesignationService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateDesignationDto) {
    return this.prisma.designation.create({
      data: {
        tenantId: dto.tenantId,
        name: dto.name,
        code: dto.code,
      },
    });
  }

  async findAll(tenantId: string) {
    return this.prisma.designation.findMany({
      where: { tenantId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string, tenantId: string) {
    return this.prisma.designation.findFirst({
      where: {
        id,
        tenantId,
      },
    });
  }
}