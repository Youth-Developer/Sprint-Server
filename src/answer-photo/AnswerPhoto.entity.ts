import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Answer from '../answer/Answer.entity';

@Entity('answer_photo')
export default class AnswerPhoto {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column({ name: 'image_path', nullable: true })
  imagePath: string | null;

  @ManyToOne(() => Answer, (question) => question.answerPhoto, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'answer_idx' })
  answer: Answer;
}
