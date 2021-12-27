import { OmitType } from '@nestjs/swagger';
import { RegisterDto } from './register.dto';

export class SignInDto extends OmitType(RegisterDto, ['username'] as const) {}
