import { TbOrgDept } from './TbOrgDept';
import { TbOrgUser } from './TbOrgUser';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';

@Index('DeptId', ['deptId'], {})
@Index('Uid', ['uid'], {})
@Entity('TbOrgDeptUser', { schema: 'FormDB' })
export class TbOrgDeptUser {
  @Column('varchar', { primary: true, name: 'DeptId', length: 50 })
  deptId: string;

  @Column('varchar', { primary: true, name: 'Uid', length: 50 })
  uid: string;

  @Column('tinyint', { name: 'Enable', width: 1, default: () => "'0'" })
  enable: boolean;

  @ManyToOne(() => TbOrgDept, (tbOrgDept) => tbOrgDept.tbOrgDeptUsers, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'DeptId', referencedColumnName: 'deptId' }])
  dept: TbOrgDept;

  @ManyToOne(() => TbOrgUser, (tbOrgUser) => tbOrgUser.tbOrgDeptUsers, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'Uid', referencedColumnName: 'uid' }])
  u: TbOrgUser;
}
