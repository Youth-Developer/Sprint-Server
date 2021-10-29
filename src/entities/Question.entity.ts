import { Column, Entity } from 'typeorm';
import AnswerEntity from './Answer.entity';

@Entity('question')
export default class Question extends AnswerEntity {
  @Column({ nullable: false })
  title: string;
}
