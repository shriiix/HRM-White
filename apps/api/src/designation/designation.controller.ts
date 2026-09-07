import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { DesignationService } from './designation.service.js';
import { CreateDesignationDto } from './dto/create-designation.dto.js';

@Controller('designations')
export class DesignationController {
  constructor(
    private readonly designationService: DesignationService,
  ) {}

  @Post()
  create(@Body() dto: CreateDesignationDto) {
    return this.designationService.create(dto);
  }

  @Get()
  findAll(@Query('tenantId') tenantId: string) {
    return this.designationService.findAll(tenantId);
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
    @Query('tenantId') tenantId: string,
  ) {
    return this.designationService.findOne(id, tenantId);
  }
}