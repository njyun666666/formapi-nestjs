import { Column, Entity } from 'typeorm';

@Entity('TbFlowPandingApproval', { schema: 'FormDB' })
export class TbFlowPandingApproval {
  @Column('varchar', { primary: true, name: 'PandingId', length: 50 })
  pandingId: string;

  @Column('varchar', { name: 'FormId', nullable: true, length: 50 })
  formId: string | null;

  @Column('varchar', { name: 'StepId', nullable: true, length: 50 })
  stepId: string | null;

  @Column('varchar', { name: 'StepName', nullable: true, length: 50 })
  stepName: string | null;

  @Column('int', { name: 'ApproverTarget', nullable: true })
  approverTarget: number | null;

  @Column('varchar', { name: 'ApproverId', nullable: true, length: 50 })
  approverId: string | null;

  @Column('varchar', { name: 'ApproverName', nullable: true, length: 50 })
  approverName: string | null;

  @Column('datetime', { name: 'ArrivedDate', nullable: true })
  arrivedDate: Date | null;

  @Column('tinyint', { name: 'Status', nullable: true, width: 1 })
  status: boolean | null;
}
