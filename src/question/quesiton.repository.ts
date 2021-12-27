import { EntityRepository, getConnection, getRepository, Repository } from 'typeorm';
import Question from '../entities/question.entity';
import Answer from '../entities/answer.entity';

@EntityRepository(Question)
export class QuestionRepository extends Repository<Question> {
  async countAnswer() {
   return  await getConnection()
      .createQueryBuilder()
      .select()
      .addSelect(subQuery => {
        return subQuery
          .select("count(*)")
          .from(Answer, "a")
          .where("a.question_idx = q.question_idx")
      }, "name")
      .from(Question, "q")
     .execute()
  }
}
