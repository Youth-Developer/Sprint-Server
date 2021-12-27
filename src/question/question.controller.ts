
import { QuestionService } from './question.service';
import { UpdateDto } from './dto/update.dto';
import { Body, Controller, Param, Post } from '@nestjs/common';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post('/update/:id')
  public async questionUpdate(@Param('id') id, @Body() req: UpdateDto){
    return await this.questionService.questionUpdate(id, req);
  }
}
