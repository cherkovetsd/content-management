import {
  Get,
  Controller,
  Render,
  UseInterceptors,
  Body,
  NotImplementedException,
  Post,
  Param,
  Optional,
  Delete,
  Patch, Query, BadRequestException
} from "@nestjs/common";
import { GetCommentDto } from './dto/get-comment.dto';
import { UploadCommentDto } from './dto/upload-comment.dto';
import { GetCommentListDto } from './dto/get-comment-list.dto';
import { RemoveCommentDto } from './dto/remove-comment.dto';
import { EditCommentDto } from './dto/edit-comment.dto';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CommentService } from './comment.service';

@ApiTags('comments')
@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}
  @ApiOperation({ summary: 'get comment by id' })
  @ApiResponse({
    status: 200,
    description: 'Query successfully completed',
    type: GetCommentDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @Get(':id')
  async getComment(@Param('id') stringId: string): Promise<GetCommentDto> {
    return this.commentService.getCommentByStringId(stringId);
  }

  @ApiOperation({ summary: 'get a list of comments under specified post' })
  @ApiResponse({
    status: 200,
    description: 'Query successfully completed',
    type: GetCommentListDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiQuery({
    name: 'mode',
    type: String,
    description:
      'Enter either "post" to get a list of comments under specified post, or "user" to get a list of comments written by specified user',
    required: true,
  })
  @ApiQuery({
    name: 'id',
    type: String,
    description: 'ID of specified post/user',
    required: true,
  })
  @Get()
  async getPostComments(
    @Query('mode') mode: string,
    @Query('id') stringId: string,
  ): Promise<GetCommentListDto> {
    switch (mode) {
      case 'post':
        return this.commentService.getPostCommentListDtoByStringId(stringId);
      case 'user':
        return this.commentService.getUserCommentListDtoByLogin(stringId);
      default:
        throw new BadRequestException(mode + ' is not a proper mode');
    }
  }

  @ApiOperation({
    summary: 'upload a comment under specified post; returns comment ID',
  })
  @ApiResponse({
    status: 201,
    description: 'Comment successfully uploaded',
    type: String,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @Post()
  async uploadComment(@Body() request: UploadCommentDto): Promise<string> {
    return this.commentService.uploadComment(request);
  }

  @ApiOperation({ summary: 'edit a comment' })
  @ApiResponse({
    status: 200,
    description: 'Comment successfully edited',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @Patch()
  async editComment(@Body() request: EditCommentDto) {
    await this.commentService.editComment(request);
  }

  @ApiOperation({ summary: 'remove a comment' })
  @ApiResponse({
    status: 200,
    description: 'Comment successfully removed',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @Delete()
  async removeComment(@Body() request: RemoveCommentDto) {
    await this.commentService.removeComment(request);
  }
}
