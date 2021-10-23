import { Module } from '@nestjs/common';
import { AnswerPhotoController } from './answer-photo.controller';

@Module({
  controllers: [AnswerPhotoController]
})
export class AnswerPhotoModule {}
