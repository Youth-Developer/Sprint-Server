import { Injectable } from '@nestjs/common';
import { QuestionRepository } from './quesiton.repository';
import Question from '../entities/question.entity';
import { QuestionsDto } from './dto/questions.dto';
import { CountDto } from './dto/count.dto';

@Injectable()
export class QuestionService {
  constructor(private readonly questionRepository: QuestionRepository) {}

  async findAllQuestion()  {
    const question: Question[] = await this.questionRepository.find({ relations: ["category"]});
    const count: CountDto[] = await this.questionRepository.countAnswer();
    return await this.convertQuestions(question, count);
  }

  async convertQuestions(questions: Question[], count: CountDto[]): Promise<QuestionsDto[]> {
    const questionsDto = new QuestionsDto();
    const result: QuestionsDto[] = [];
    const name: string[] = [];

    questions.forEach(function (question, index) {
      const { contents, title, createdAt, like } = question;
      question.category.forEach(function (category) {
        name.push(category.name);
      });
      questionsDto.title = title;
      questionsDto.contents = contents;
      questionsDto.count = +count[index].name;
      questionsDto.like = like;
      questionsDto.createdAt = createdAt;
      questionsDto.category = name;
      result.push(questionsDto);
    });
    return result;
  }
}