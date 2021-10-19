import { Column, Entity } from 'typeorm';
import AnswerEntity from './Answer.entity';

@Entity('question')
export default class QuestionEntity extends AnswerEntity {
  @Column({ nullable: false })
  title: string;
}
