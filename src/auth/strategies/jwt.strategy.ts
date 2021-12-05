import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../user/user.repository';
import { JwtPayload } from '../interfaces/jwt-payload';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        ExtractJwt.fromUrlQueryParameter('access_token'),
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_ACCESS_TOKEN_SECRET,
    });
  }

  async validate(payload: JwtPayload) {
    return this.authService.verifyPayload(payload);
  }
}
