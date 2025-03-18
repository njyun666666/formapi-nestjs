import { TbOrgDeptUser } from './TbOrgDeptUser';
import { Column, Entity, Index, OneToMany } from 'typeorm';

@Index('Idx_ParentDeptId', ['parentDeptId'], {})
@Index('Idx_RootDeptId', ['rootDeptId'], {})
@Index('Idx_RootDeptId_DeptId', ['rootDeptId', 'deptId'], {})
@Entity('TbOrgDept', { schema: 'FormDB' })
export class TbOrgDept {
  @Column('varchar', { primary: true, name: 'DeptId', length: 50 })
  deptId: string;

  @Column('varchar', { name: 'DeptName', length: 50 })
  deptName: string;

  @Column('varchar', { name: 'ParentDeptId', nullable: true, length: 50 })
  parentDeptId: string | null;

  @Column('varchar', { name: 'RootDeptId', length: 50 })
  rootDeptId: string;

  @Column('tinyint', { name: 'Enable', width: 1, default: () => "'0'" })
  enable: boolean;

  @Column('tinyint', { name: 'Expand', width: 1, default: () => "'0'" })
  expand: boolean;

  @Column('varchar', { name: 'LogId', nullable: true, length: 50 })
  logId: string | null;

  @Column('datetime', { name: 'ModifiedTime', nullable: true })
  modifiedTime: Date | null;

  @Column('varchar', { name: 'ModifiedBy', nullable: true, length: 50 })
  modifiedBy: string | null;

  @OneToMany(() => TbOrgDeptUser, (tbOrgDeptUser) => tbOrgDeptUser.dept)
  tbOrgDeptUsers: TbOrgDeptUser[];
}
