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
import User from './user.entity';
import Answer from './answer.entity';
import QuestionPhoto from './question-photo.entity';
import Category from './category.entity';

@Entity('question')
export default class Question extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'question_idx'})
  idx: number;

  @Column({ name: 'question_title',nullable: false })
  title: string;

  @Column({  name: 'question_contents', nullable: false })
  contents: string;

  @Column({  name: 'question_like', nullable: false, default: 0 })
  like: number;

  @CreateDateColumn({ name: 'question_created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'question_updated_at' })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.question, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_idx' })
  user: User;

  @OneToMany(() => Answer, (answer) => answer.question)
  answer: Answer[];

  @OneToMany(() => QuestionPhoto, (questionPhoto) => questionPhoto.question)
  questionPhoto: QuestionPhoto[];

  @OneToMany(() => Category, (category) => category.question)
  @JoinColumn({ name: 'question_category'})
  category: Category[];
}
