import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { LocationService } from './location.service.js';
import { CreateLocationDto } from './dto/create-location.dto.js';

@Controller('locations')
export class LocationController {
  constructor(
    private readonly locationService: LocationService,
  ) {}

  @Post()
  create(@Body() dto: CreateLocationDto) {
    return this.locationService.create(dto);
  }

  @Get()
  findAll(@Query('tenantId') tenantId: string) {
    return this.locationService.findAll(tenantId);
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
    @Query('tenantId') tenantId: string,
  ) {
    return this.locationService.findOne(id, tenantId);
  }
}