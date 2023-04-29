import { ApiProperty } from '@nestjs/swagger';

export class UploadCommentDto {
  @ApiProperty()
  authToken: string;
  @ApiProperty()
  login: string;
  @ApiProperty()
  postId: string;
  @ApiProperty()
  text: string;
}
