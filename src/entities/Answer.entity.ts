import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('answer')
export default class AnswerEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column({ nullable: false })
  contents: string;

  @Column({ nullable: false, default: 0 })
  like: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
