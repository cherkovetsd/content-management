import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class RemoveCommentDto {
  @ApiProperty()
  @IsNotEmpty()
  commentId: string;
}
