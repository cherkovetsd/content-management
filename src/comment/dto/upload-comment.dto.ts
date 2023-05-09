import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class UploadCommentDto {
  @ApiProperty()
  @IsNotEmpty()
  login: string;
  @ApiProperty()
  @IsNotEmpty()
  postId: string;
  @ApiProperty()
  @IsNotEmpty()
  text: string;
}
