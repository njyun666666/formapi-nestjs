import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('TbFormSerialNo', { schema: 'FormDB' })
export class TbFormSerialNo {
  @PrimaryGeneratedColumn({ type: 'int', name: 'Id' })
  id: number;

  @Column('varchar', { name: 'FormClass', length: 50 })
  formClass: string;

  @Column('int', { name: 'Year' })
  year: number;

  @Column('int', { name: 'Month' })
  month: number;

  @Column('int', { name: 'Day' })
  day: number;

  @Column('int', { name: 'YearNo' })
  yearNo: number;

  @Column('int', { name: 'MonthNo' })
  monthNo: number;

  @Column('int', { name: 'DayNo' })
  dayNo: number;

  @Column('varchar', { name: 'FormId', length: 50 })
  formId: string;
}
