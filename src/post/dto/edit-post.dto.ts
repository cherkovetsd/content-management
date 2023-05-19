import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, IsUrl, Matches } from 'class-validator';

export class EditPostDto {
  @ApiProperty()
  @IsNotEmpty()
  postId: string;
  @ApiProperty()
  @IsNotEmpty()
  headline: string;
  @ApiProperty()
  @IsString()
  description: string;
  @ApiProperty()
  @IsUrl({}, { each: true })
  @Matches(new RegExp('/*(.png|.jpg|.jpeg|.gif)$'), { each: true })
  imageUrls: string[];
}
