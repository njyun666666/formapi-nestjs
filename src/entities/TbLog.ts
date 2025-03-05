import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index('Idx_TbLog_LogId', ['logId'], {})
@Entity('TbLog', { schema: 'FormDB' })
export class TbLog {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'AutoId' })
  autoId: string;

  @Column('varchar', { name: 'LogId', length: 50 })
  logId: string;

  @Column('varchar', { name: 'Uid', length: 50 })
  uid: string;

  @Column('datetime', { name: 'UpdateTime' })
  updateTime: Date;

  @Column('varchar', { name: 'UpdateTable', length: 50 })
  updateTable: string;

  @Column('varchar', { name: 'LogState', length: 50 })
  logState: string;

  @Column('json', { name: 'OriginalValues', nullable: true })
  originalValues: object | null;

  @Column('json', { name: 'CurrentValues', nullable: true })
  currentValues: object | null;
}
