import { EntityRepository, Repository } from 'typeorm';
import Category from './Category.entity';

@EntityRepository(Category)
export class CategoryRepository extends Repository<Category> {}
