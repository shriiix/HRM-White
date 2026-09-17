import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { PrismaService } from '../../../database/prisma.service.js';
import { PERMISSIONS_KEY } from '../../decorators/permissions/permissions.decorator.js';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.getAllAndOverride<
      string[]
    >(PERMISSIONS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // Allow endpoints that do not require specific permissions
    if (!requiredPermissions || requiredPermissions.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user?.userId || !user?.tenantId) {
      throw new UnauthorizedException('User authentication required');
    }

    const userRoles = await this.prisma.userRole.findMany({
      where: {
        userId: user.userId,
        role: {
          tenantId: user.tenantId,
          isActive: true,
        },
      },
      include: {
        role: {
          include: {
            rolePermissions: {
              include: {
                permission: true,
              },
            },
          },
        },
      },
    });

    const userPermissions = new Set(
      userRoles.flatMap((userRole) =>
        userRole.role.rolePermissions
          .filter(
            (rolePermission) =>
              rolePermission.permission.tenantId === user.tenantId &&
              rolePermission.permission.isActive,
          )
          .map((rolePermission) => rolePermission.permission.code),
      ),
    );

    const hasPermission = requiredPermissions.every((permission) =>
      userPermissions.has(permission),
    );

    if (!hasPermission) {
      throw new ForbiddenException('Insufficient permissions');
    }

    return true;
  }
}