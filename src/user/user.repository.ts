import { Repository } from 'typeorm';
import User from '../entities/User.entity';

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
