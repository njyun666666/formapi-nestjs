import { TbOrgUser } from './TbOrgUser';
import { Column, Entity, ManyToMany } from 'typeorm';

@Entity('TbOrgRole', { schema: 'FormDB' })
export class TbOrgRole {
  @Column('varchar', { primary: true, name: 'Rid', length: 50 })
  rid: string;

  @Column('varchar', { name: 'RoleName', length: 50 })
  roleName: string;

  @ManyToMany(() => TbOrgUser, (tbOrgUser) => tbOrgUser.tbOrgRoles)
  tbOrgUsers: TbOrgUser[];
}
