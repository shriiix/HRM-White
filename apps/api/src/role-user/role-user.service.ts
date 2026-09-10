import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../database/prisma.service.js';
import { CreateUserRoleDto } from './dto/create-user-role.dto.js';

@Injectable()
export class RoleUserService {
  constructor(private readonly prisma: PrismaService) {}

  async assign(dto: CreateUserRoleDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: dto.userId,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const role = await this.prisma.role.findUnique({
      where: {
        id: dto.roleId,
      },
    });

    if (!role) {
      throw new NotFoundException('Role not found');
    }

    // Prevent assigning a role from another tenant
    if (user.tenantId !== role.tenantId) {
      throw new BadRequestException(
        'User and role must belong to the same tenant',
      );
    }

    return this.prisma.userRole.create({
      data: {
        userId: dto.userId,
        roleId: dto.roleId,
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            tenantId: true,
          },
        },
        role: true,
      },
    });
  }

  async findByUser(userId: string) {
    return this.prisma.userRole.findMany({
      where: {
        userId,
      },
      include: {
        role: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}