import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { JwtRefreshGuard } from '../auth/guards/jwt-refresh.guard';
import { User } from '../common/decorators/user.decorator';
import { TokenDto } from './dto/token.dto';
import { TokenService } from './token.service';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@Controller()
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @ApiTags('Refresh')
  @ApiOperation({ summary: '토큰 재발급' })
  @ApiBearerAuth('AccessToken')
  @ApiHeader({
    name: 'refresh',
    required: true,
    description: 'Refresh Token',
  })
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtRefreshGuard)
  @Get('refresh')
  async refresh(@User() user) {
    const data: TokenDto = await this.tokenService.createTokens(
      user.email,
      user.username,
    );
    return {
      status: 200,
      message: '토큰을 재발급하였습니다.',
      data,
    };
  }
}
