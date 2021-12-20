import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from '../user/user.repository';
import User from '../entities/user.entity';
import { RegisterDto } from '../user/dto/register.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async register({ email, username, password }: RegisterDto): Promise<void> {
    let user: User;
    user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
      user = await this.userRepository.create({
        email: email,
        username: username,
        password: hashedPassword,
      });
      await this.userRepository.save(user);
    } else throw new BadRequestException('이미 등록된 사용자입니다.');
  }

  async login(email: string, password: string): Promise<User> {
    let user: User;
    try {
      user = await this.userRepository.findUser({ where: { email } });
    } catch (err) {
      throw new UnauthorizedException(
        `There isn't any user with email: ${email}`,
      );
    }
    if (!(await user.checkPassword(password))) {
      throw new UnauthorizedException(
        `Wrong password for user with email: ${email}`,
      );
    }
    return user;
  }
}
