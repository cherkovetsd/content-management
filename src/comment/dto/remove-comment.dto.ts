import { ApiProperty } from '@nestjs/swagger';

export class RemoveCommentDto {
  @ApiProperty()
  authToken: string;
  @ApiProperty()
  commentId: string;
}
