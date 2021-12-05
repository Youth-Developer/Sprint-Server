import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Question from './question.entity';

@Entity('Category')
export default class Category {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column({ nullable: false })
  name: string;

  @ManyToOne(() => Question, (question) => question.category, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'question_idx' })
  question: Question;
}
