  import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
  import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

  export class PostDto {
    //  *** jwt에서 유저 정보를 받아오는 것 대신, 유저의 idx를 임시적으로 받아서 테스트함. ***
    @IsNumber()
    @ApiModelProperty({
      example: '1',
      description: '유저 IDX',
      required: true,
    })
    userIdx!: number;
    //  *** jwt에서 유저 정보를 받아오는 것 대신, 유저의 idx를 임시적으로 받아서 테스트함. ***

    @IsNumber()
    @ApiModelProperty({
      description: '질문글 IDX',
      required: true,
    })
    questionIdx!: number;

    @IsNotEmpty({ message: '제목을 입력해주세요!'})
    @IsString()
    @ApiModelProperty({
      example: 'TypeScript에서 declare가 뭔가요??',
      description: '제목',
      required: true,
    })
    @ApiModelProperty({ required: true })
    title!: string;

    @IsNotEmpty({ message: '내용을 입력해주세요!' })
    @IsString()
    @ApiModelProperty({
      example:
        'NextJs와 Sass를 TypeScript환경에서 사용하던중 배포를 했을때 실패해서 에러로그를 보니 mixed-content 라는 에러가 떴습니다.',
      description: '내용',
      required: true,
    })
    contents!: string;

    @IsString()
    @IsNotEmpty()
    @ApiModelProperty({
      example: 'TypeScript',
      description: '카테고리',
      required: true,
    })
    category: string;
  }
