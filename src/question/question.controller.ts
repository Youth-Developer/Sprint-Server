import { Body, Controller, Post } from '@nestjs/common';
import { QuestionService } from './question.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PostDto } from './dto/post.dto';

@ApiTags('QUESTION')
@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @ApiOperation({ summary: '질문글 게시' })
  @ApiResponse({
    description: '성공',
    type: PostDto,
  })
  @Post('/post')
  public async createPost(@Body() req: PostDto): Promise<number> {
    return await this.questionService.createPost(req);
  }
}
