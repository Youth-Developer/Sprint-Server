import { EntityRepository, Repository } from 'typeorm';
import User from '../entities/User.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async findUserById(idx: number): Promise<User | undefined> {
    return await this.findOne({ where: { idx: idx } });
  }
  async findUserByName(username: string): Promise<User | undefined> {
    return await this.findOne({ where: { username: username } });
  }
  async findUserByEmail(email: string): Promise<User | undefined> {
    return await this.findOne({ where: { email: email } });
  }
}
