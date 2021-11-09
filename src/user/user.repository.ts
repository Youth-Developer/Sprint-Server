import { EntityRepository, Repository } from 'typeorm';
import User from './User.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async findUserById(idx: number): Promise<User | undefined> {
    return await this.findOne({ idx: idx });
  }
  async findUserByName(username: string): Promise<User | undefined> {
    return await this.findOne({ username: username });
  }
  async findUserByEmail(email: string): Promise<User | undefined> {
    return await this.findOne({ email: email });
  }
}
