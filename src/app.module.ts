import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MemberModule } from './member/member.module';
import { AnswerModule } from './answer/answer.module';
import { SettingsModule } from './settings/settings.module';
import { DatabaseModule } from './database/database.module';
import { QuestionPhotoModule } from './question-photo/question-photo.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MemberModule,
    AnswerModule,
    SettingsModule,
    DatabaseModule,
    QuestionPhotoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
