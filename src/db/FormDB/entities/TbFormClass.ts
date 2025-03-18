import { TbFormAuth } from './TbFormAuth';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('TbFormClass', { schema: 'FormDB' })
export class TbFormClass {
  @Column('varchar', { primary: true, name: 'FormClass', length: 50 })
  formClass: string;

  @Column('varchar', { name: 'GroupId', length: 50 })
  groupId: string;

  @Column('varchar', { name: 'SerialNoSetting', nullable: true, length: 255 })
  serialNoSetting: string | null;

  @OneToMany(() => TbFormAuth, (tbFormAuth) => tbFormAuth.formClass2)
  tbFormAuths: TbFormAuth[];
}
