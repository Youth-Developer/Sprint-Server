import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from '../user/user.repository';
import { QuestionRepository } from './quesiton.repository';
import { PostDto } from './dto/post.dto';
import { CategoryService } from '../category/category.service';
import User from '../entities/user.entity';

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
    const post = await this.questionRepository.save({
      title: postDto.title,
      contents: postDto.title,
      createdAt: new Date(),
      user: user
    });

    await this.categoryService.createCategory(post, category);
    return userIdx;
  }
}
