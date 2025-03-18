import { Column, Entity } from 'typeorm';

@Entity('TbForm', { schema: 'FormDB' })
export class TbForm {
  @Column('varchar', { primary: true, name: 'FormId', length: 50 })
  formId: string;

  @Column('varchar', { name: 'FormClass', length: 50 })
  formClass: string;

  @Column('varchar', { name: 'ApplicantId', nullable: true, length: 50 })
  applicantId: string | null;

  @Column('varchar', { name: 'ApplicantName', nullable: true, length: 50 })
  applicantName: string | null;

  @Column('datetime', { name: 'ApplicationDate', nullable: true })
  applicationDate: Date | null;

  @Column('varchar', { name: 'Description', nullable: true, length: 255 })
  description: string | null;

  @Column('varchar', { name: 'SerialNo', nullable: true, length: 50 })
  serialNo: string | null;

  @Column('varchar', { name: 'FlowId', nullable: true, length: 50 })
  flowId: string | null;

  @Column('int', { name: 'Status', nullable: true })
  status: number | null;
}
