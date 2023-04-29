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
  Patch,
} from '@nestjs/common';
import { GetCommentDto } from './dto/get-comment.dto';
import { UploadCommentDto } from './dto/upload-comment.dto';
import { GetCommentListDto } from './dto/get-comment-list.dto';
import { RemoveCommentDto } from './dto/remove-comment.dto';
import { EditCommentDto } from './dto/edit-comment.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('comment')
@Controller('comment')
export class CommentController {
  @ApiOperation({ summary: 'get comment by id' })
  @ApiResponse({
    status: 201,
    description: 'Query successfully completed',
    type: GetCommentDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @Get('get')
  async getComment(@Param('id') stringId: string): Promise<GetCommentDto> {
    throw new NotImplementedException();
  }

  @ApiOperation({ summary: 'get a list of comments under specified post' })
  @ApiResponse({
    status: 201,
    description: 'Query successfully completed',
    type: GetCommentListDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @Get('get-from-post')
  async getPostComments(
    @Param('id') postId: string,
  ): Promise<GetCommentListDto> {
    throw new NotImplementedException();
  }

  @ApiOperation({ summary: 'get a list of comments written by specified user' })
  @ApiResponse({
    status: 201,
    description: 'Query successfully completed',
    type: GetCommentListDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @Get('get-from-user')
  async getUserComments(
    @Param('login') login: string,
  ): Promise<GetCommentListDto> {
    throw new NotImplementedException();
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
  @Post('upload')
  async uploadComment(@Body() request: UploadCommentDto): Promise<string> {
    throw new NotImplementedException();
  }

  @ApiOperation({ summary: 'edit a comment' })
  @ApiResponse({
    status: 201,
    description: 'Comment successfully edited',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @Patch('edit')
  async editComment(@Body() request: EditCommentDto) {
    throw new NotImplementedException();
  }

  @ApiOperation({ summary: 'remove a comment' })
  @ApiResponse({
    status: 201,
    description: 'Comment successfully removed',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @Delete('delete')
  async removeComment(@Body() request: RemoveCommentDto) {
    throw new NotImplementedException();
  }
}
