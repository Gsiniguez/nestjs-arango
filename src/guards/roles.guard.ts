import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    if (!roles) throw new UnauthorizedException();

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user.roles) throw new UnauthorizedException();

    const hasRole = this.matchRole(roles, user.roles);
    return hasRole;
  }

  matchRole(roles: string[], userRoles: string[]) {
    return userRoles.some(ur => roles.find(r => r === ur));
  }
}
