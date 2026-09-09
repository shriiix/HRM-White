import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service.js';
import { CreateLocationDto } from './dto/create-location.dto.js';

@Injectable()
export class LocationService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateLocationDto) {
    return this.prisma.location.create({
      data: {
        tenantId: dto.tenantId,
        name: dto.name,
        code: dto.code,
        address: dto.address,
        city: dto.city,
        state: dto.state,
        country: dto.country,
      },
    });
  }

  async findAll(tenantId: string) {
    return this.prisma.location.findMany({
      where: { tenantId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string, tenantId: string) {
    return this.prisma.location.findFirst({
      where: {
        id,
        tenantId,
      },
    });
  }
}