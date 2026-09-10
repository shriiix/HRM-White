import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RolePermissionService } from './role-permission.service.js';
import { CreateRolePermissionDto } from './dto/create-role-permission.dto.js';

@Controller('role-permissions')
export class RolePermissionController {
  constructor(
    private readonly rolePermissionService: RolePermissionService,
  ) {}

  @Post()
  assign(@Body() dto: CreateRolePermissionDto) {
    return this.rolePermissionService.assign(dto);
  }

  @Get('role/:roleId')
  findByRole(@Param('roleId') roleId: string) {
    return this.rolePermissionService.findByRole(roleId);
  }
}