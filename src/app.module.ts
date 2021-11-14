import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AnswerModule } from './answer/answer.module';
import { SettingsModule } from './settings/settings.module';
import { DatabaseModule } from './database/database.module';
import { QuestionPhotoModule } from './question-photo/question-photo.module';
import { AnswerPhotoModule } from './answer-photo/answer-photo.module';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { AuthModule } from './auth/auth.module';

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
    CategoryModule,
    AuthModule,
  ],
})
export class AppModule {}
