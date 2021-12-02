import { OmitType } from '@nestjs/mapped-types';
import { RegisterDto } from './register.dto';

export class SignInDto extends OmitType(RegisterDto, ['username'] as const) {}
