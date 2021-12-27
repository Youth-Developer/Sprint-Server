import { Controller, Get } from '@nestjs/common';
import { QuestionService } from './question.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { QuestionsDto } from './dto/find.dto';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @ApiTags('전체조회')
  @ApiOperation({ summary: '전체조회' })
  @Get('/')
  async index() {
    const data: QuestionsDto[] = await this.questionService.findAllQuestion();
    return {
      status: 200,
      message: "전체조회에 성공하였습니다",
      data
    }
  }
}
