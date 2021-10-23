import { Module } from '@nestjs/common';
import { QuestionPhotoService } from './question-photo.service';

@Module({
  providers: [QuestionPhotoService]
})
export class QuestionPhotoModule {}
