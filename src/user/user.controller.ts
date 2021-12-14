import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from '../auth/auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly authService: AuthService) {}

  @ApiTags('SignUp')
  @ApiOperation({ summary: '회원가입' })
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signUp(@Body() registerDto: RegisterDto) {
    const data = await this.authService.register(registerDto);
    return {
      status: 200,
      message: '회원가입을 성공하였습니다.',
      data,
    };
  }

  @ApiTags('Login')
  @ApiOperation({ summary: '로그인' })
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() body: SignInDto) {
    const data = await this.authService.login(body.email, body.password);
    return {
      status: 200,
      message: '로그인을 성공하였습니다.',
      data,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  profile(@Request() req) {
    return req.user;
  }
}
