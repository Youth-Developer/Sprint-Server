import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from '../user/user.repository';
import { QuestionRepository } from './quesiton.repository';
import { PostDto } from './dto/post.dto';
import User from '../entities/User.entity';
import Question from '../entities/Question.entity';
import { CategoryService } from '../category/category.service';

@Injectable()
export class QuestionService {
  constructor(
    private readonly questionRepository: QuestionRepository,
    private readonly userRepository: UserRepository,
    private readonly categoryService: CategoryService,
  ) {}

  async createPost(postDto: PostDto): Promise<number> {
    const { userIdx, category } = postDto;

    const user: User = await this.userRepository.findOne(userIdx);

    if (user === undefined) {
      throw new BadRequestException('존재하지 않는 유저입니다');
    }
    const post: Question = await this.getQuestion(postDto, user);
    await this.questionRepository.save(post);

    await this.categoryService.createCategory(post, category);
    return userIdx;
  }

  async getQuestion(postDto: PostDto, user: User): Promise<Question> {
    const question: Question = new Question();
    const date = new Date();
    question.title = postDto.title;
    question.contents = postDto.contents;
    question.createdAt = date;
    question.user = await user;
    return question;
  }
}
