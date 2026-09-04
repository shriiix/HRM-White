import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service.js';
import { CreateUserDto } from './dto/create-user.dto.js';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  private get user() {
    return (this.prisma as any).user;
  }

  async create(createUserDto: CreateUserDto) {
    const { tenantId, email, password, firstName, lastName } = createUserDto;

    return this.user.create({
      data: {
        tenantId,
        email,
        passwordHash: password,
        firstName,
        lastName,
      },
    });
  }

  async findAll() {
    return this.user.findMany({
      select: {
        id: true,
        tenantId: true,
        email: true,
        firstName: true,
        lastName: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async findOne(id: string) {
    return this.user.findUnique({
      where: { id },
      select: {
        id: true,
        tenantId: true,
        email: true,
        firstName: true,
        lastName: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }
}