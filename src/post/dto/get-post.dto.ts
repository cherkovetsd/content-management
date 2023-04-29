import { ApiProperty } from '@nestjs/swagger';

export class GetPostDto {
  @ApiProperty()
  login: string;
  @ApiProperty()
  fullName: string;
  @ApiProperty()
  headline: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  tags: string[];
  @ApiProperty()
  imageUrls: string[];
}
