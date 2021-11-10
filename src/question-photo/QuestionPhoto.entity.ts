import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Question from '../question/Question.entity';

@Entity('question_photo')
export default class QuestionPhoto {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column({ name: 'image_path', nullable: true })
  imagePath: string | null;

  @ManyToOne(() => Question, (question) => question.questionPhoto, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'question_idx' })
  question: Question[];
}
