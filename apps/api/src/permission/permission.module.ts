import { Module } from '@nestjs/common';
import { PermissionController } from './permission.controller.js';
import { PermissionService } from './permission.service.js';
import { PrismaService } from '../database/prisma.service.js';

@Module({
  controllers: [PermissionController],
  providers: [PermissionService, PrismaService],
})
export class PermissionModule {}