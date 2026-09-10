import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { RoleService } from './role.service.js';
import { CreateRoleDto } from './dto/create-role.dto.js';

@Controller('roles')
export class RoleController {
  constructor(
    private readonly roleService: RoleService,
  ) {}

  @Post()
  create(@Body() dto: CreateRoleDto) {
    return this.roleService.create(dto);
  }

  @Get()
  findAll(@Query('tenantId') tenantId: string) {
    return this.roleService.findAll(tenantId);
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
    @Query('tenantId') tenantId: string,
  ) {
    return this.roleService.findOne(id, tenantId);
  }
}