import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service.js';

@Injectable()
export class TenantService {
  constructor(private readonly prisma: PrismaService) {}

  async create(name: string, slug: string) {
    return this.prisma.tenant.create({
      data: {
        name,
        slug,
      },
    });
  }

  async findAll() {
    return this.prisma.tenant.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.tenant.findUnique({
      where: {
        id,
      },
    });
  }
}