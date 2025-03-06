import { MENUS_KEY } from '../decorators/menus.decorator';
import { MenuEnum } from '../enums/meun.enum';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { JwtPayload } from 'src/modules/login/dto/login.dto';

@Injectable()
export class MenusGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    const requiredMenus = this.reflector.getAllAndOverride<MenuEnum[]>(
      MENUS_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredMenus) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const user = request['user'] as JwtPayload;
    return requiredMenus.some((menu) => user.menu?.includes(menu));
  }
}
