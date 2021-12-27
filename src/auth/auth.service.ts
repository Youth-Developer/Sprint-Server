import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from '../user/user.repository';
import User from '../entities/user.entity';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async register({ email, username, password }: RegisterDto): Promise<void> {
    let user: User;
    user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      user = this.userRepository.create({
        email: email,
        username: username,
        password: password,
      });
      await this.userRepository.save(user);
    } else throw new BadRequestException('이미 등록된 사용자입니다.');
  }

  async login(email: string, password: string): Promise<User> {
    const user: User = await this.userRepository.findUser({ where: { email } });
    if (!(await user.checkPassword(password))) {
      throw new UnauthorizedException(
        `Wrong password for user with email: ${email}`,
      );
    }
    return user;
  }

  async logout(idx: number): Promise<void> {
    const user: User = await this.userRepository.findUser({
      where: idx.toString(),
    });
    await user.removeRefreshToken();
  }
}
