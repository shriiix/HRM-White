import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from './auth/guards/jwt-auth/jwt-auth.guard.js';

@Controller()
export class AppController {
  @UseGuards(JwtAuthGuard)
  @Get('protected')
  getProtected(@Request() req: any) {
    return {
      message: 'You have access to the protected endpoint',
      user: req.user,
    };
  }
}