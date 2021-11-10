import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Question from '../question/Question.entity';

@Entity('Category')
export default class Category {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column({ nullable: false })
  name: string;

  @ManyToOne( () => Question, (question) => question.category)
  question: Question;
}