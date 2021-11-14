import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity, JoinColumn, ManyToOne, OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import User from '../user/User.entity';
import Answer from '../answer/Answer.entity';
import QuestionPhoto from '../question-photo/QuestionPhoto.entity';
import Category from '../category/Category.entity';

@Entity('question')
export default class Question extends BaseEntity {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  contents: string;

  @Column({ nullable: false, default: 0 })
  like: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.question, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_idx' })
  user: User;

  @OneToMany(() => Answer, (answer) => answer.question)
  answer: Answer[];

  @OneToMany( () => QuestionPhoto, (questionPhoto) => questionPhoto.question)
  questionPhoto: QuestionPhoto[];

  @OneToMany( () => Category, (category) => category.question)
  category: Category;
}
