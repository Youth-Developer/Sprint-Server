import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Question from './question.entity';
import User from './user.entity';
import AnswerPhoto from './answer-photo.entity';

@Entity('answer')
export default class Answer extends BaseEntity {
  @PrimaryGeneratedColumn( { name: 'answer_idx'})
  idx: number;

  @Column({ name: 'answer_contents', nullable: false })
  contents: string;

  @Column({ name: 'answer_like', nullable: false, default: 0 })
  like: number;

  @CreateDateColumn({ name: 'answer_created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'answer_updated_at' })
  updatedAt: Date;

  @ManyToOne(() => Question, (question) => question.answer, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'question_idx' })
  question: Question;

  @ManyToOne(() => User, (user) => user.answer, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_idx' })
  user: User;

  @OneToMany(() => AnswerPhoto, (answerPhoto) => answerPhoto.answer)
  answerPhoto: AnswerPhoto[];
}
