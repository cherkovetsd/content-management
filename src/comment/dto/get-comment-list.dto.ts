import { ApiProperty } from '@nestjs/swagger';
import { GetPostDto } from '../../post/dto/get-post.dto';
import { GetCommentDto } from './get-comment.dto';

export class GetCommentListDto {
  @ApiProperty({
    isArray: true,
    type: GetPostDto,
  })
  comments: GetCommentDto[];
}
