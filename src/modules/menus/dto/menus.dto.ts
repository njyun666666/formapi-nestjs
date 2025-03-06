import { Expose } from 'class-transformer';

export class MenuResponseDto {
  menuId: string;
  parentMenuId: string | null;
  menuName: string;
  icon: string | null;
  url: string | null;
  enable: boolean;
  sort: number;

  @Expose()
  children?: MenuResponseDto[];

  constructor(partial: Partial<MenuResponseDto>) {
    Object.assign(this, partial);
  }
}
