import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUrl, Matches } from 'class-validator';

export class UploadPostDto {
  @ApiProperty()
  @IsNotEmpty()
  login: string;
  @ApiProperty()
  @IsNotEmpty()
  headline: string;
  @ApiProperty()
  @IsString()
  description: string;
  @ApiProperty()
  @IsNotEmpty({ each: true })
  tags: string[];
  @ApiProperty()
  @IsUrl({}, { each: true })
  @Matches(new RegExp('/*(.png|.jpg|.jpeg|.gif)$'), { each: true })
  imageUrls: string[];
}
