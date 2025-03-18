import { Column, Entity } from 'typeorm';

@Entity('TbFlow', { schema: 'FormDB' })
export class TbFlow {
  @Column('varchar', { primary: true, name: 'FlowId', length: 50 })
  flowId: string;

  @Column('json', { name: 'FlowJson', nullable: true })
  flowJson: object | null;
}
