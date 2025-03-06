import { MenusService } from './menus.service';
import { Controller, Get } from '@nestjs/common';
import { User } from 'src/common/decorators/user.decorator';

@Controller('menus')
export class MenusController {
  constructor(private readonly menusService: MenusService) {}

  @Get()
  getMenus(@User('uid') uid: string) {
    return this.menusService.getMenus(uid);
  }
}
