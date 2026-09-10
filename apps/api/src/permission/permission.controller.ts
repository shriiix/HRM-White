import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { PermissionService } from './permission.service.js';
import { CreatePermissionDto } from './dto/create-permission.dto.js';

@Controller('permissions')
export class PermissionController {
  constructor(
    private readonly permissionService: PermissionService,
  ) {}

  @Post()
  create(@Body() dto: CreatePermissionDto) {
    return this.permissionService.create(dto);
  }

  @Get()
  findAll(@Query('tenantId') tenantId: string) {
    return this.permissionService.findAll(tenantId);
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
    @Query('tenantId') tenantId: string,
  ) {
    return this.permissionService.findOne(id, tenantId);
  }
}