import {
  GoneException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from '../user/user.repository';
import { JwtPayload } from '../common/interfaces/jwt-payload';
import { JwtService } from '@nestjs/jwt';
import * as jwt from 'jsonwebtoken';
import { TokenDto } from './dto/token.dto';
import * as bcrypt from 'bcrypt';
import User from '../entities/user.entity';

@Injectable()
export class TokenService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async validateToken(
    token: string,
    isRefresh = false,
  ): Promise<JwtPayload | boolean> {
    let verify: JwtPayload = null;
    let user: User = null;
    try {
      const secretKey = process.env.JWT_REFRESH_TOKEN_SECRET;
      verify = jwt.verify(token, secretKey) as JwtPayload;
      if (isRefresh) {
        user = await this.userRepository.findUser({ where: verify.iss });
        await user.checkRefreshToken(token);
      }
      return verify;
    } catch (e) {
      switch (e.message) {
        // 토큰에 대한 오류를 판단합니다.
        case 'invalid signature': // signature의 구문을 분석할 수 없을 경우
        case 'invalid token': // 헤더 또는 페이로드의 구문을 분석할 수 없을 경우
        case 'jwt malformed': // 토큰에 구조적으로 문제가 생겼을 경우
        case 'jwt signature is required': // 토큰에 signature을 확인하지 못 했을 경우
        case 'Unexpected token': // 토큰의 형식이 원하는 형식과 맞지 않는 경우
          throw new UnauthorizedException('유효하지 않은 토큰입니다.');

        case 'jwt expired': // 토큰이 만료되었을 경우
          throw new GoneException('만료된 토큰입니다.');

        default:
          throw new InternalServerErrorException('서버 오류입니다.');
      }
    }
  }

  createAccessToken(email: string, username: string): string {
    const payload: JwtPayload = {
      iss: email,
      sub: username,
    };
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_ACCESS_TOKEN_SECRET,
      expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME + 's',
      algorithm: 'HS256',
    });
  }

  async createRefreshToken(username: string): Promise<string> {
    const payload: JwtPayload = {
      iss: null,
      sub: null,
    };
    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_TOKEN_SECRET,
      expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME + 's',
      algorithm: 'HS256',
    });
    await this.setHashedRefreshToken(refreshToken, username);
    return refreshToken;
  }

  async setHashedRefreshToken(
    refreshToken: string,
    username: string,
  ): Promise<void> {
    const currentHashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.userRepository.update(
      { username },
      { currentHashedRefreshToken },
    );
  }

  async createTokens(email: string, username: string): Promise<TokenDto> {
    const accessToken: string = this.createAccessToken(email, username);
    const refreshToken: string = await this.createRefreshToken(username);
    return {
      username: username,
      accessToken: 'Bearer ' + accessToken,
      refreshToken: 'Bearer ' + refreshToken,
    };
  }
}
