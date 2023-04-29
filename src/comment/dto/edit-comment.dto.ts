import { ApiProperty } from '@nestjs/swagger';

export class EditCommentDto {
  @ApiProperty()
  commentId: string;
  @ApiProperty()
  authToken: string;
  @ApiProperty()
  postId: string;
  @ApiProperty()
  text: string;
}
