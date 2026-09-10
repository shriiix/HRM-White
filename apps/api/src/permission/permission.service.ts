import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service.js';
import { CreatePermissionDto } from './dto/create-permission.dto.js';

@Injectable()
export class PermissionService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreatePermissionDto) {
    return this.prisma.permission.create({
      data: {
        tenantId: dto.tenantId,
        name: dto.name,
        code: dto.code,
        description: dto.description,
      },
    });
  }

  async findAll(tenantId: string) {
    return this.prisma.permission.findMany({
      where: { tenantId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string, tenantId: string) {
    return this.prisma.permission.findFirst({
      where: {
        id,
        tenantId,
      },
    });
  }
}