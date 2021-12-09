import { Injectable } from '@nestjs/common';
import { CategoryRepository } from './category.repository';
import Category from '../entities/Category.entity';
import Question from '../entities/Question.entity';

@Injectable()
export class CategoryService {
  constructor(
    private readonly categoryRepository: CategoryRepository,
  ) {}

  async createCategory(question: Question, reqCategory: string[]) {
    for(const postCategory of reqCategory){
      const category: Category = new Category();
      category.name = postCategory;
      category.question = question;
      await this.categoryRepository.save(category);
    }
  }

}
