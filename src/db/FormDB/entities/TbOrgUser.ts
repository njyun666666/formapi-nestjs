import { TbOrgDeptUser } from './TbOrgDeptUser';
import { TbOrgRole } from './TbOrgRole';
import {
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  OneToMany,
} from 'typeorm';

@Index('EMail', ['email'], { unique: true })
@Entity('TbOrgUser', { schema: 'FormDB' })
export class TbOrgUser {
  @Column('varchar', { primary: true, name: 'Uid', length: 50 })
  uid: string;

  @Column('varchar', { name: 'Email', unique: true, length: 50 })
  email: string;

  @Column('varchar', { name: 'Password', nullable: true, length: 255 })
  password: string | null;

  @Column('varchar', { name: 'Name', length: 50 })
  name: string;

  @Column('varchar', { name: 'PhotoUrl', nullable: true, length: 100 })
  photoUrl: string | null;

  @Column('tinyint', { name: 'Enable', width: 1, default: () => "'0'" })
  enable: boolean;

  @Column('varchar', { name: 'OAuthProvIder', nullable: true, length: 50 })
  oAuthProvIder: string | null;

  @Column('varchar', { name: 'LogId', nullable: true, length: 50 })
  logId: string | null;

  @OneToMany(() => TbOrgDeptUser, (tbOrgDeptUser) => tbOrgDeptUser.u)
  tbOrgDeptUsers: TbOrgDeptUser[];

  @ManyToMany(() => TbOrgRole, (tbOrgRole) => tbOrgRole.tbOrgUsers)
  @JoinTable({
    name: 'TbOrgRoleUser',
    joinColumns: [{ name: 'Uid', referencedColumnName: 'uid' }],
    inverseJoinColumns: [{ name: 'Rid', referencedColumnName: 'rid' }],
    schema: 'FormDB',
  })
  tbOrgRoles: TbOrgRole[];
}
