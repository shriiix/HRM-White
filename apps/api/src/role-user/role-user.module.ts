import { Module } from '@nestjs/common';
import { RoleUserController } from './role-user.controller.js';
import { RoleUserService } from './role-user.service.js';
import { PrismaService } from '../database/prisma.service.js';

@Module({
  controllers: [RoleUserController],
  providers: [RoleUserService, PrismaService],
})
export class RoleUserModule {}