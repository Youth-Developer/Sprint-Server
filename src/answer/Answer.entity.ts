import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne, OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Question from '../question/Question.entity';
import User from '../user/User.entity';
import AnswerPhoto from '../answer-photo/AnswerPhoto.entity';

@Entity('answer')
export default class Answer extends BaseEntity {
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

  @ManyToOne(() => Question, (question) => question.answer, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'question_idx' })
  question: Question;

  @ManyToOne(() => User, (user) => user.answer, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'user_idx' })
  user: User;

  @OneToMany( () => AnswerPhoto, (answerPhoto) => answerPhoto.answer)
  answerPhoto: AnswerPhoto[];
}
