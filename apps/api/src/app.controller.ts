import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from './auth/guards/jwt-auth/jwt-auth.guard.js';
import { PermissionGuard } from './auth/guards/permission/permission.guard.js';
import { Permissions } from './auth/decorators/permissions/permissions.decorator.js';
import { TenantGuard } from './auth/guards/tenant/tenant.guard.js';

@Controller()
export class AppController {
  @UseGuards(JwtAuthGuard, TenantGuard, PermissionGuard)
  @Get('protected/employee')
  @Permissions('EMPLOYEE_VIEW')

  getProtected(@Request() req: any) {
    return {
      message: 'You have access to the protected endpoint',
      user: req.user,
      tenantId: req.tenantId,
    };
  }
}