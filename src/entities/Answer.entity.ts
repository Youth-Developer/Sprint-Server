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
import Question from './Question.entity';
import User from './User.entity';
import AnswerPhoto from './AnswerPhoto.entity';

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

  @ManyToOne(() => Question, (question) => question.idx, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'question_idx' })
  question: Question;

  @ManyToOne(() => User, (user) => user.idx, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'user_idx' })
  user: User;

  @OneToMany( () => AnswerPhoto, (answerPhoto) => answerPhoto.idx)
  answerPhoto: AnswerPhoto[];
}
