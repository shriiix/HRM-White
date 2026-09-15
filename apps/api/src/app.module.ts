import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';

import { PrismaModule } from './database/prisma.module.js';
import { TenantModule } from './tenant/tenant.module.js';
import { UserModule } from './user/user.module.js';
import { EmployeeModule } from './employee/employee.module.js';
import { DepartmentModule } from './department/department.module.js';
import { DesignationModule } from './designation/designation.module.js';
import { LocationModule } from './location/location.module.js';
import { RoleModule } from './role/role.module.js';
import { PermissionModule } from './permission/permission.module.js';
import { RolePermissionModule } from './role-permission/role-permission.module.js';
import { RoleUserModule } from './role-user/role-user.module.js';
import { AuthModule } from './auth/auth.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    PrismaModule,

    TenantModule,
    UserModule,
    EmployeeModule,
    DepartmentModule,
    DesignationModule,
    LocationModule,
    RoleModule,
    PermissionModule,
    RolePermissionModule,
    RoleUserModule,

    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}