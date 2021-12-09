import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from '../user/user.repository';
import User from '../entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from '../user/dto/register.dto';
import { JwtPayload } from './interfaces/jwt-payload';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}
  async register({ email, username, password }: RegisterDto): Promise<void> {
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

  async login(email: string, password: string): Promise<any> {
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
    const payload: JwtPayload = {
      iss: user.email,
      username: user.username,
      userId: user.idx,
    };
    delete user.password;
    return {
      user,
      access_token: this.jwtService.sign(payload),
    };
  }

  async verifyPayload(payload: JwtPayload): Promise<User> {
    let user: User;
    try {
      user = await this.userRepository.findUser({
        where: { email: payload.iss, username: payload.username },
      });
    } catch (error) {
      throw new UnauthorizedException(`There isn't any user`);
    }
    delete user.password;
    return user;
  }
}
