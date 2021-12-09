import {
  ExecutionContext,
  GoneException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import * as jwt from 'jsonwebtoken';
import { AuthService } from '../auth.service';
import { JwtPayload } from '../interfaces/jwt-payload';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly authService: AuthService) {
    super();
  }
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;

    if (authorization === undefined) {
      throw new UnauthorizedException('Token 전송 안됨');
    }

    const token = authorization.replace('Bearer ', '');
    request.user = this.validateToken(token); // request.user 객체에 디코딩된 토큰(유저 정보)을 저장합니다.
    return true;
  }

  async validateToken(token: string) {
    const secretKey: string = process.env.JWT_ACCESS_TOKEN_SECRET;
    try {
      const payload: JwtPayload = jwt.verify(token, secretKey) as JwtPayload;
      await this.authService.verifyPayload(payload);
      return payload;
    } catch (e) {
      switch (e.message) {
        // 토큰에 대한 오류를 판단합니다.
        case 'invalid token':
        case 'token is array':
        case `There isn't any user`:
          throw new UnauthorizedException('유효하지 않은 토큰입니다.');

        case 'jwt expired':
          throw new GoneException('만료된 토큰입니다.');

        default:
          throw new InternalServerErrorException('서버 오류입니다.');
      }
    }
  }
}
