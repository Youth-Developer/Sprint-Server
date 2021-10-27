import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('question_photo')
export default class QuestionPhotoEntity {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column({ name: 'image_path', nullable: true })
  imagePath: string | null;
}
