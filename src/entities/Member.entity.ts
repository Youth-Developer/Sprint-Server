import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('member')
export default class MemberEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false, unique: true })
  nickname: string;

  @Column({ nullable: false, unique: true, select: false })
  password: string;

  @Column({ nullable: true, default: null })
  bio: string;

  @Column({ nullable: true, default: null })
  github_address: string;

  @Column({ nullable: true, default: null })
  discord_tag: string;
}
