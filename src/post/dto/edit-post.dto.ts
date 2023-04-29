import { ApiProperty } from '@nestjs/swagger';

export class EditPostDto {
  @ApiProperty()
  postId: string;
  @ApiProperty()
  authToken: string;
  @ApiProperty()
  headline: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  tags: string[];
  @ApiProperty()
  imageUrls: string[];
}
