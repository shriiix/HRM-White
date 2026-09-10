import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service.js';
import { CreateRoleDto } from './dto/create-role.dto.js';

@Injectable()
export class RoleService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateRoleDto) {
    return this.prisma.role.create({
      data: {
        tenantId: dto.tenantId,
        name: dto.name,
        code: dto.code,
        description: dto.description,
      },
    });
  }

  async findAll(tenantId: string) {
    return this.prisma.role.findMany({
      where: { tenantId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string, tenantId: string) {
    return this.prisma.role.findFirst({
      where: {
        id,
        tenantId,
      },
    });
  }
}