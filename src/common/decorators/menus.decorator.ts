import { MenuEnum } from '../enums/meun.enum';
import { SetMetadata } from '@nestjs/common';

export const MENUS_KEY = 'menus';
export const Menus = (...menus: MenuEnum[]) => SetMetadata(MENUS_KEY, menus);
