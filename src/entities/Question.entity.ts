import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity, JoinColumn, ManyToOne, OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import User from './User.entity';
import Answer from './Answer.entity';

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

  @ManyToOne(() => User, (user) => user.idx, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_idx' })
  user: User;

  @OneToMany(() => Answer, (answer) => answer.idx)
  answer: Answer[];
}
