import {
  Get,
  Controller,
  Render,
  UseInterceptors,
  Post,
  Body,
  NotImplementedException,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { GetPostDto } from './dto/get-post.dto';
import { UploadPostDto } from './dto/upload-post.dto';
import { EditPostDto } from './dto/edit-post.dto';
import { RemovePostDto } from './dto/remove-post.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('posts')
@Controller('posts')
export class PostController {
  @ApiOperation({ summary: 'get post by id' })
  @ApiResponse({
    status: 201,
    description: 'Query successfully completed',
    type: GetPostDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @Get('get')
  async getPost(@Param('id') stringId: string): Promise<GetPostDto> {
    throw new NotImplementedException();
  }

  @ApiOperation({
    summary: 'upload a post; returns post ID',
  })
  @ApiResponse({
    status: 201,
    description: 'Post successfully uploaded',
    type: String,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @Post('upload')
  async uploadPost(@Body() request: UploadPostDto): Promise<string> {
    throw new NotImplementedException();
  }

  @ApiOperation({ summary: 'edit a post' })
  @ApiResponse({
    status: 201,
    description: 'Post successfully edited',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @Patch('edit')
  async editPost(@Body() request: EditPostDto) {
    throw new NotImplementedException();
  }

  @ApiOperation({ summary: 'remove a post' })
  @ApiResponse({
    status: 201,
    description: 'Post successfully removed',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @Delete('delete')
  async removePost(@Body() request: RemovePostDto) {
    throw new NotImplementedException();
  }
}
