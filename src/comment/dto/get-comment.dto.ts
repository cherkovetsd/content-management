import { ApiProperty } from '@nestjs/swagger';

export class GetCommentDto {
  @ApiProperty()
  authorLogin: string;
  @ApiProperty()
  fullName: string;
  @ApiProperty()
  postId: string;
  @ApiProperty()
  postHeadline: string;
  @ApiProperty()
  text: string;
}
