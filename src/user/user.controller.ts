import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from '../auth/auth.service';
import { SignInDto } from './dto/sign-in.dto';
import User from '../entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly authService: AuthService) {}

  @ApiTags('SignUp')
  @ApiOperation({ summary: '회원가입' })
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signUp(@Body() registerDto: RegisterDto): Promise<void> {
    return await this.authService.register(registerDto);
  }

  @ApiTags('Login')
  @ApiOperation({ summary: '로그인' })
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() body: SignInDto): Promise<User> {
    return this.authService.login(body.email, body.password);
  }
}
