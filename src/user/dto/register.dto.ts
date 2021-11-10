import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({
    example: 's20041@gsm.hs.kr',
    description: '이메일',
    required: true,
  })
  @IsNotEmpty({ message: '이메일을 입력해주세요!' })
  @IsString()
  @Matches(/^[a-zA-Z0-9]+@gsm.hs.kr$/)
  readonly email!: string;

  @ApiProperty({
    example: '송유현',
    description: '이름',
    required: true,
  })
  @IsNotEmpty({ message: '이름을 입력해주세요!' })
  @IsString()
  @MaxLength(10, { message: '닉네임이 너무 길어요!' })
  readonly username!: string;

  @ApiProperty({
    example: 'thddbgus1234',
    description: '비밀번호',
    required: true,
  })
  @IsNotEmpty({ message: '비밀번호를 입력해주세요!' })
  @IsString()
  @MinLength(4, { message: '비밀번호가 너무 짧습니다!' })
  readonly password!: string;
}
