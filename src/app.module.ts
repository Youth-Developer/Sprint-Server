import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AnswerModule } from './models/answer/answer.module';
import { SettingsModule } from './models/settings/settings.module';
import { DatabaseModule } from './database/database.module';
import { QuestionPhotoModule } from './models/question-photo/question-photo.module';
import { AnswerPhotoModule } from './models/answer-photo/answer-photo.module';
import { UserModule } from './models/user/user.module';
import { AuthModule } from './models/auth/auth.module';

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
    AuthModule,
  ],
})
export class AppModule {}
