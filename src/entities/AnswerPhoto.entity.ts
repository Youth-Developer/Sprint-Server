import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('answer_photo')
export default class AnswerPhotoEntity {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column({ name: 'image_path', nullable: true })
  imagePath: string;
}