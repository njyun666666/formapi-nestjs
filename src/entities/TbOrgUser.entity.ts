import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('TbOrgUser')
export class TbOrgUser {
  @PrimaryGeneratedColumn()
  Uid: string;

  @Column()
  Email: string;

  @Column()
  Password: string;

  @Column()
  Name: string;

  @Column()
  PhotoUrl: string;

  @Column()
  Enable: boolean;
}
