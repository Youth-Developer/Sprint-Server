import { EntityRepository, Repository } from 'typeorm';
import Question from './Question.entity';

@EntityRepository(Question)
export class QuestionRepository extends Repository<Question> {}
