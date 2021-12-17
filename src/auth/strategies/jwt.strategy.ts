import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: true, // 토큰이 만료되더라도 strategy 단에서 에러를 리턴하지 않도록 설정
      secretOrKey: process.env.JWT_ACCESS_TOKEN_SECRET,
    });
  }
}
