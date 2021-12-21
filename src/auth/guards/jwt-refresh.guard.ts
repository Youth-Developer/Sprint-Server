import {
  BadRequestException,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './jwt-auth.guard';

@Injectable()
export class JwtRefreshGuard extends AuthGuard('jwt-refresh-token') {
  constructor() {
    super();
  }
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const { refresh } = request.headers;

    if (refresh === undefined) {
      throw new BadRequestException('RefreshToken 헤더가 비어있습니다.');
    }

    const refreshToken = refresh.replace('Bearer ', '');
    request.user = JwtAuthGuard.validateToken(refreshToken, true);
    return true;
  }
}
