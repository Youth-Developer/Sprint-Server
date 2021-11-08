import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(10, { message: '닉네임이 너무 길어요!' })
  username!: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(4, { message: '비밀번호가 너무 짧습니다!' })
  password!: string;
}
