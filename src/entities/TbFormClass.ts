import { Column, Entity } from 'typeorm';

@Entity('TbFormClass', { schema: 'FormDB' })
export class TbFormClass {
  @Column('varchar', { primary: true, name: 'FormClass', length: 50 })
  formClass: string;

  @Column('varchar', { name: 'GroupId', length: 50 })
  groupId: string;
}
