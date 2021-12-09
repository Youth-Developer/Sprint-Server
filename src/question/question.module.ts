import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '../user/user.repository';
import { QuestionRepository } from './quesiton.repository';
import { CategoryRepository } from '../category/category.repository';
import { CategoryService } from '../category/category.service';

@Module({
  imports: [TypeOrmModule.forFeature([QuestionRepository, UserRepository, CategoryRepository])],
  controllers: [QuestionController],
  providers: [QuestionService, CategoryService],
})
export class QuestionModule {}
