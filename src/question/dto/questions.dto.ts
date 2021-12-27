import Question from '../../entities/question.entity';
import { OmitType } from '@nestjs/swagger';

export class QuestionsDto extends OmitType(Question, ['category', 'questionPhoto', 'answer'] as const ){
  category: string[];
  count: number;
}