import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RoleUserService } from './role-user.service.js';
import { CreateUserRoleDto } from './dto/create-user-role.dto.js';

@Controller('user-roles')
export class RoleUserController {
  constructor(
    private readonly roleUserService: RoleUserService,
  ) {}

  @Post()
  assign(@Body() dto: CreateUserRoleDto) {
    return this.roleUserService.assign(dto);
  }

  @Get('user/:userId')
  findByUser(@Param('userId') userId: string) {
    return this.roleUserService.findByUser(userId);
  }
}