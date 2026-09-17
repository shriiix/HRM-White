import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { createObserveModule } from '@nestjs/observe';

import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PermissionGuard } from './auth/guards/permission/permission.guard.js';
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
import { PassportModule } from '@nestjs/passport';

export const { ObserveModule, ObserveInstrument } =
  createObserveModule();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    ObserveModule.forRoot({
      serviceId: process.env.OBSERVE_SERVICE_ID ?? '',
      appKey: process.env.OBSERVE_APP_KEY ?? '',
      appSecret: process.env.OBSERVE_APP_SECRET ?? '',
    }),
    PassportModule.register({
      defaultStrategy: 'jwt',
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

  providers: [AppService,PermissionGuard],
})
export class AppModule { }