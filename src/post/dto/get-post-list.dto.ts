import { ApiProperty } from '@nestjs/swagger';
import { GetPostDto } from './get-post.dto';

export class GetPostListDto {
  @ApiProperty({
    isArray: true,
    type: GetPostDto,
  })
  posts: GetPostDto[];
}
