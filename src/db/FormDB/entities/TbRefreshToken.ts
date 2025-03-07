import { Column, Entity } from 'typeorm';

@Entity('TbRefreshToken', { schema: 'FormDB' })
export class TbRefreshToken {
  @Column('varchar', { primary: true, name: 'RefreshToken', length: 255 })
  refreshToken: string;

  @Column('datetime', { name: 'ExpireTime' })
  expireTime: Date;

  @Column('varchar', { name: 'Uid', length: 255 })
  uid: string;
}
