import { Injectable } from '@nestjs/common';
import { UserRepository } from '../user/user.repository';
import { JwtPayload } from '../auth/interfaces/jwt-payload';
import { JwtService } from '@nestjs/jwt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class TokenService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

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

  createRefreshToken(): string {
    const payload: JwtPayload = {
      iss: null,
      sub: null,
    };
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_TOKEN_SECRET,
      expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME + 's',
      algorithm: 'HS256',
    });
  }

  verify(token: string): JwtPayload {
    const secretKey: string = process.env.JWT_ACCESS_TOKEN_SECRET;
    return jwt.verify(token, secretKey) as JwtPayload;
  }

  decode(token: string): JwtPayload {
    return jwt.decode(token) as JwtPayload;
  }
}
