import {
  BadRequestException,
  ExecutionContext,
  GoneException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import User from '../../entities/user.entity';
import { JwtPayload } from '../../common/interfaces/jwt-payload';
import { TokenService } from '../../token/token.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly tokenService: TokenService) {
    super();
  }
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;

    if (authorization === undefined) {
      throw new BadRequestException('Authorization 헤더가 비어있습니다.');
    }

    const accessToken = authorization.replace('Bearer ', '');
    request.user = this.validateToken(accessToken); // request.user 객체에 디코딩된 토큰(유저 정보)을 저장합니다.
    return true;
  }

  validateToken(token: string, isRefresh = false): JwtPayload {
    let verify: JwtPayload = null;
    try {
      verify = this.tokenService.verify(token);
      return verify;
    } catch (e) {
      switch (e.message) {
        // 토큰에 대한 오류를 판단합니다.
        case 'invalid signature':
        case 'invalid token':
        case 'jwt malformed':
          throw new UnauthorizedException('유효하지 않은 토큰입니다.');

        case 'token expired':
          if (isRefresh) {
            verify = this.tokenService.decode(token);
            return verify;
          }
          throw new GoneException('만료된 토큰입니다.');

        default:
          throw new InternalServerErrorException('서버 오류입니다.');
      }
    }
  }
}
