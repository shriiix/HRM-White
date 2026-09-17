import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class TenantGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    const user = request.user;

    if (!user || !user.tenantId) {
      throw new UnauthorizedException(
        'Tenant information not found',
      );
    }

    // Attach authenticated tenant ID to the request
    request.tenantId = user.tenantId;

    return true;
  }
}