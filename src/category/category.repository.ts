import { EntityRepository, Repository } from 'typeorm';
import Category from '../entities/Category.entity';

@EntityRepository(Category)
export class CategoryRepository extends Repository<Category> {}
