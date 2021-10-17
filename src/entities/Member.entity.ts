import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('member')
export default class MemberEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'idx' })
  idx: number;

  @Column({ nullable: false, unique: true, length: 30 })
  email: string;

  @Column({ nullable: false, unique: true, length: 30 })
  nickname: string;

  @Column({ nullable: false, unique: true, length: 255, select: false })
  password: string;

  @Column({ nullable: true, default: null })
  bio: string;

  @Column({ nullable: true, default: null })
  github_address: string;

  @Column({ nullable: true, default: null })
  discord_tag: string;
}
