import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterDto } from './dto/register.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: '회원가입' })
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signUp(@Body() registerDto: RegisterDto): Promise<void> {
    return await this.userService.register(registerDto);
  }
}
