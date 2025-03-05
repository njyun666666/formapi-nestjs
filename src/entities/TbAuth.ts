import { TbMenu } from './TbMenu';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Index('MenuId', ['menuId'], {})
@Entity('TbAuth', { schema: 'FormDB' })
export class TbAuth {
  @PrimaryGeneratedColumn({ type: 'int', name: 'Id' })
  id: number;

  @Column('varchar', { name: 'MenuId', length: 50 })
  menuId: string;

  @Column('int', { name: 'AuthType' })
  authType: number;

  @Column('varchar', { name: 'TargetId', length: 50 })
  targetId: string;

  @Column('tinyint', { name: 'IncludeChildren', default: () => "'0'" })
  includeChildren: number;

  @ManyToOne(() => TbMenu, (tbMenu) => tbMenu.tbAuths, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'MenuId', referencedColumnName: 'menuId' }])
  menu: TbMenu;
}
