import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import Question from './question.entity';
import Answer from './answer.entity';
import { Exclude } from 'class-transformer';
@Entity('user')
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'user_idx',})
  idx: number;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false, unique: true })
  username: string;

  @Column({ nullable: false, unique: true })
  password: string;

  @Column({ nullable: true, default: null })
  bio: string | null;

  @Column({ nullable: true, default: null })
  github_address: string | null;

  @Column({ nullable: true, default: null })
  discord_tag: string | null;

  @Column({ name: 'refresh_token', nullable: true })
  @Exclude()
  refreshToken?: string;

  @OneToMany(() => Question, (question) => question.user)
  question: Question[];

  @OneToMany(() => Answer, (answer) => answer.user)
  @JoinColumn({ name: 'answer_idx' })
  answer: Answer[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }

  async checkPassword(plainPassword: string): Promise<boolean> {
    return await bcrypt.compare(plainPassword, this.password);
  }
}
