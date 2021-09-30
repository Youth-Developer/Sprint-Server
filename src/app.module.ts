import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MemberModule } from './member/member.module';
import { BoardModule } from './board/board.module';
import { AnswerModule } from './answer/answer.module';

@Module({
  imports: [MemberModule, BoardModule, AnswerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
