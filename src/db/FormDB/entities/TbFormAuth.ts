import { TbFormClass } from './TbFormClass';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Index('TbFormAuth_relation_1', ['formClass'], {})
@Entity('TbFormAuth', { schema: 'FormDB' })
export class TbFormAuth {
  @PrimaryGeneratedColumn({ type: 'int', name: 'Id' })
  id: number;

  @Column('varchar', { name: 'FormClass', length: 50 })
  formClass: string;

  @Column('int', { name: 'AuthType' })
  authType: number;

  @Column('varchar', { name: 'TargetId', length: 50 })
  targetId: string;

  @Column('tinyint', { name: 'Application', width: 1, default: () => "'0'" })
  application: boolean;

  @Column('tinyint', { name: 'ReadAll', width: 1, default: () => "'0'" })
  readAll: boolean;

  @ManyToOne(() => TbFormClass, (tbFormClass) => tbFormClass.tbFormAuths, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'FormClass', referencedColumnName: 'formClass' }])
  formClass2: TbFormClass;
}
