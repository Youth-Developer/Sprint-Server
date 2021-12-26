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
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthService } from '../auth/auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { TokenDto } from '../token/dto/token.dto';
import { TokenService } from '../token/token.service';
import { LocalAuthGuard } from '../auth/guards/local-auth.guard';
import { User } from '../common/decorators/user.decorator';

@Controller('user')
export class UserController {
  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokenService,
  ) {}

  @ApiTags('SignUp')
  @ApiOperation({ summary: '회원가입' })
  @ApiCreatedResponse({ description: '회원가입 성공' })
  @ApiBadRequestResponse({ description: '이미 등록된 사용자입니다.' })
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signUp(@Body() registerDto: RegisterDto) {
    await this.authService.register(registerDto);
    const data: TokenDto = await this.tokenService.createTokens(
      registerDto.email,
      registerDto.username,
    );
    return {
      status: 200,
      message: '회원가입을 성공하였습니다.',
      data,
    };
  }

  @ApiTags('Login')
  @ApiOperation({ summary: '로그인' })
  @ApiBody({ type: SignInDto })
  @ApiOkResponse({ description: '로그인 성공(토큰 발급)' })
  @ApiUnauthorizedResponse({
    description: `틀린 비밀번호, 혹은 등록되지 않은 이메일`,
  })
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  async login(@User() user) {
    const data: TokenDto = await this.tokenService.createTokens(
      user.email,
      user.username,
    );
    return {
      status: 200,
      message: '로그인을 성공하였습니다.',
      data,
    };
  }

  @ApiBearerAuth()
  @ApiTags('Test')
  @ApiOperation({ summary: 'profile' })
  @ApiBearerAuth('accessToken')
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  profile(@Request() req) {
    return req.user;
  }
}
