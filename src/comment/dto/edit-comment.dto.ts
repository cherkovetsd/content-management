import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class EditCommentDto {
  @ApiProperty()
  @IsNotEmpty()
  commentId: string;
  @ApiProperty()
  @IsNotEmpty()
  text: string;
}
