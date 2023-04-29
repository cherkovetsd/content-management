import { ApiProperty } from '@nestjs/swagger';

export class UploadPostDto {
  @ApiProperty()
  authToken: string;
  @ApiProperty()
  login: string;
  @ApiProperty()
  headline: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  tags: string[];
  @ApiProperty()
  imageUrls: string[];
}
