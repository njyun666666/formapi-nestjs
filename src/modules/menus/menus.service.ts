import { MenuResponseDto } from './dto/menus.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TbMenu } from 'src/entities/TbMenu';
import { Repository } from 'typeorm';

@Injectable()
export class MenusService {
  constructor(
    @InjectRepository(TbMenu)
    private readonly tbMenu: Repository<TbMenu>,
  ) {}

  async getMenus(uid: string) {
    const menus = await this.tbMenu
      .createQueryBuilder()
      .where('Enable=1 and FnAuth(:uid,menuId)>0', { uid: uid })
      .orderBy('Sort')
      .getMany();

    return this.setMenus(menus);
  }

  setMenus(menus: TbMenu[], parentMenuId?: string) {
    const list: TbMenu[] = [];

    if (parentMenuId) {
      list.push(...menus.filter((item) => item.parentMenuId == parentMenuId));
    } else {
      list.push(...menus.filter((item) => !item.parentMenuId));
    }

    if (list.length == 0) return undefined;

    return list.map((item) => {
      const m = new MenuResponseDto(item);

      m.children = this.setMenus(menus, item.menuId);
      return m;
    });
  }
}
