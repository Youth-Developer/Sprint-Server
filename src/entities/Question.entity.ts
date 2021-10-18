import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('question')
export default class QuestionEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  question_id: number;

  @Column({ nullable: false, unique: true })
  subject: string;

  @Column({ nullable: false })
  contents: string;

  @Column({ nullable: false, default: 0 })
  like: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
