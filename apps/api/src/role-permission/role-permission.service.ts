import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../database/prisma.service.js';
import { CreateRolePermissionDto } from './dto/create-role-permission.dto.js';

@Injectable()
export class RolePermissionService {
  constructor(private readonly prisma: PrismaService) {}

  async assign(dto: CreateRolePermissionDto) {
    const role = await this.prisma.role.findUnique({
      where: {
        id: dto.roleId,
      },
    });

    if (!role) {
      throw new NotFoundException('Role not found');
    }

    const permission = await this.prisma.permission.findUnique({
      where: {
        id: dto.permissionId,
      },
    });

    if (!permission) {
      throw new NotFoundException('Permission not found');
    }

    // Important: prevent cross-tenant role/permission assignment
    if (role.tenantId !== permission.tenantId) {
      throw new BadRequestException(
        'Role and permission must belong to the same tenant',
      );
    }

    return this.prisma.rolePermission.create({
      data: {
        roleId: dto.roleId,
        permissionId: dto.permissionId,
      },
      include: {
        role: true,
        permission: true,
      },
    });
  }

  async findByRole(roleId: string) {
    return this.prisma.rolePermission.findMany({
      where: {
        roleId,
      },
      include: {
        permission: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}