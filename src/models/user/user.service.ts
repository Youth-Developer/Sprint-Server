import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { RegisterDto } from './dto/register.dto';
import User from './user.entity';
import { FindOneOptions } from 'typeorm';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async register(registerDto: RegisterDto): Promise<void> {
    const { email } = registerDto;
    try {
      const user: User = await this.userRepository.findOne({ email });
      if (!user) {
        const result: User = await this.userRepository.create(registerDto);
        await this.userRepository.save(result);
      } else throw new BadRequestException('User already exists');
    } catch {
      throw new BadRequestException('User already exists');
    }
  }

  async findUser(where: FindOneOptions<User>): Promise<User> {
    const user = await this.userRepository.findOne(where);
    if (!user) {
      throw new NotFoundException(
        `There isn't any user with identifier: ${where}`,
      );
    }
    return user;
  }
}
