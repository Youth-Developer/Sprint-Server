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
import Question from './Question.entity';
@Entity('user')
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false, unique: true })
  nickname: string;

  @Column({ nullable: false, unique: true, select: false })
  password: string;

  @Column({ nullable: true, default: null })
  bio: string | null;

  @Column({ nullable: true, default: null })
  github_address: string | null;

  @Column({ nullable: true, default: null })
  discord_tag: string | null;

  @OneToMany(() => Question, (question) => question.idx)
  question: Question[];

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
