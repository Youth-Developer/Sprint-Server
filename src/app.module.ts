import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AnswerModule } from './answer/answer.module';
import { SettingsModule } from './settings/settings.module';
import { DatabaseModule } from './database/database.module';
import { QuestionPhotoModule } from './question-photo/question-photo.module';
import { AnswerPhotoModule } from './answer-photo/answer-photo.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AnswerModule,
    SettingsModule,
    DatabaseModule,
    QuestionPhotoModule,
    AnswerPhotoModule,
    UserModule,
  ],
})
export class AppModule {}
