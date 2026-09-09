// app.module.ts
import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PrismaModule } from './database/prisma.module.js';
import { UserModule } from './user/user.module.js';
import { ConfigModule } from '@nestjs/config';
import { TenantModule } from './tenant/tenant.module.js';
import { EmployeeModule } from './employee/employee.module.js';
import { DepartmentModule } from './department/department.module.js';
import { DesignationModule } from './designation/designation.module.js';
import { LocationModule } from './location/location.module.js';



export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ObserveModule.forRoot({
      appKey: 'YOUR_APP_KEY',
      appSecret: 'YOUR_APP_SECRET',
      serviceId: 'api',
    }),
    PrismaModule,
    UserModule,
    TenantModule,
    EmployeeModule,
    DepartmentModule,
    DesignationModule,
    LocationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}