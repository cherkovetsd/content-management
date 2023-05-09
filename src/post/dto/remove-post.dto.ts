import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class RemovePostDto {
  @ApiProperty()
  @IsNotEmpty()
  postId: string;
}
