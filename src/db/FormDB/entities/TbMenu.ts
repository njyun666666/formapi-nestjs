import { TbAuth } from './TbAuth';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('TbMenu', { schema: 'FormDB' })
export class TbMenu {
  @Column('varchar', { primary: true, name: 'MenuId', length: 50 })
  menuId: string;

  @Column('varchar', { name: 'ParentMenuId', nullable: true, length: 50 })
  parentMenuId: string | null;

  @Column('varchar', { name: 'MenuName', length: 50 })
  menuName: string;

  @Column('varchar', { name: 'Icon', nullable: true, length: 50 })
  icon: string | null;

  @Column('varchar', { name: 'URL', nullable: true, length: 50 })
  url: string | null;

  @Column('tinyint', { name: 'Enable', width: 1, default: () => "'0'" })
  enable: boolean;

  @Column('int', { name: 'Sort' })
  sort: number;

  @OneToMany(() => TbAuth, (tbAuth) => tbAuth.menu)
  tbAuths: TbAuth[];
}
