import { Column, Entity } from 'typeorm';

@Entity('TbFlowApproval', { schema: 'FormDB' })
export class TbFlowApproval {
  @Column('varchar', { primary: true, name: 'ApprovalId', length: 50 })
  approvalId: string;

  @Column('varchar', { name: 'PandingId', nullable: true, length: 50 })
  pandingId: string | null;

  @Column('varchar', { name: 'FormId', nullable: true, length: 50 })
  formId: string | null;

  @Column('varchar', { name: 'StepId', nullable: true, length: 50 })
  stepId: string | null;

  @Column('varchar', { name: 'StepName', nullable: true, length: 50 })
  stepName: string | null;

  @Column('varchar', { name: 'ApproverId', nullable: true, length: 50 })
  approverId: string | null;

  @Column('varchar', { name: 'ApproverName', nullable: true, length: 50 })
  approverName: string | null;

  @Column('datetime', { name: 'ArrivedDate', nullable: true })
  arrivedDate: Date | null;

  @Column('varchar', { name: 'Action', nullable: true, length: 50 })
  action: string | null;

  @Column('varchar', { name: 'Comment', nullable: true, length: 1000 })
  comment: string | null;

  @Column('datetime', { name: 'ApprovalDate', nullable: true })
  approvalDate: Date | null;
}
