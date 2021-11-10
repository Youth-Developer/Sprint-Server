import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @IsNotEmpty({ message: '이메일을 입력해주세요!' })
  @IsString()
  @Matches(/^[a-zA-Z0-9]+@gsm.hs.kr$/)
  readonly email!: string;

  @IsNotEmpty({ message: '이름을 입력해주세요!' })
  @IsString()
  @MaxLength(10, { message: '닉네임이 너무 길어요!' })
  readonly username!: string;

  @IsNotEmpty({ message: '비밀번호를 입력해주세요!' })
  @IsString()
  @MinLength(4, { message: '비밀번호가 너무 짧습니다!' })
  readonly password!: string;
}
