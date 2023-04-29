import { ApiProperty } from '@nestjs/swagger';

export class GetCommentListDto {
  @ApiProperty()
  idList: string[];
}
