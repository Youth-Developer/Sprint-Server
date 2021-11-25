import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AnswerModule } from './answer/answer.module';
import { DatabaseModule } from './database/database.module';
import { QuestionPhotoModule } from './question-photo/question-photo.module';
import { AnswerPhotoModule } from './answer-photo/answer-photo.module';
import { UserModule } from './user/user.module';
import { QuestionModule } from './question/question.module';
import { CategoryModule } from './category/category.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AnswerModule,
    DatabaseModule,
    QuestionPhotoModule,
    AnswerPhotoModule,
    UserModule,
    QuestionModule,
    CategoryModule,
    AuthModule,
  ],
})
export class AppModule {}
