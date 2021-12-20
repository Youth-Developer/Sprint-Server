import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '../user/user.repository';
import { TokenService } from '../token/token.service';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_ACCESS_TOKEN_SECRET,
      signOptions: {
        algorithm: 'HS256',
        expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME + 's',
      },
    }),
  ],
  providers: [AuthService, JwtStrategy, TokenService, LocalStrategy],
  exports: [AuthService, TokenService],
})
export class AuthModule {}
