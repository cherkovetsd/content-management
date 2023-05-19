import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class GetCommentDto {
  @ApiPropertyOptional()
  authorLogin?: string;
  @ApiPropertyOptional()
  fullName?: string;
  @ApiPropertyOptional()
  postId?: string;
  @ApiPropertyOptional()
  postHeadline?: string;
  @ApiProperty()
  text: string;
  @ApiPropertyOptional()
  stringId?: string;
}
