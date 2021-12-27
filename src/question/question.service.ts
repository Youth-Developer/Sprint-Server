import { Injectable } from '@nestjs/common';
import { QuestionRepository } from './quesiton.repository';
import { UpdateDto } from './dto/update.dto';

@Injectable()
export class QuestionService {
  constructor(private questionRepository: QuestionRepository) {}

  async questionUpdate(id:number, req:UpdateDto){
    await this.questionRepository.update(id, req);
  }
}
