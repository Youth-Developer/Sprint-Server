import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from '../user/user.repository';
import User from '../entities/User.entity';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from '../user/dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}
  async register(registerDto: RegisterDto): Promise<void> {
    const { email, username, password } = registerDto;
    let user: User;
    user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      user = await this.userRepository.create({
        email: email,
        username: username,
        password: password,
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
    delete user.password;
    return user;
  }

  async signToken(user: User) {
    const payload = {
      email: user.email,
      sub: user.idx,
    };

    return {
      user,
      access_token: this.jwtService.sign(payload),
    };
  }
}
