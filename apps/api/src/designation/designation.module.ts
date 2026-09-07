import { Module } from '@nestjs/common';
import { DesignationController } from './designation.controller.js';
import { DesignationService } from './designation.service.js';
import { PrismaService } from '../database/prisma.service.js';

@Module({
  controllers: [DesignationController],
  providers: [DesignationService, PrismaService],
})
export class DesignationModule {}