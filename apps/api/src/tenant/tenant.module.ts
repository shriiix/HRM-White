import { Module } from '@nestjs/common';

import { TenantController } from './tenant.controller.js';
import { TenantService } from './tenant.service.js';
import { PrismaService } from '../database/prisma.service.js';

@Module({
  controllers: [TenantController],
  providers: [TenantService, PrismaService],
})
export class TenantModule {}