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
  Query,
} from '@nestjs/common';
import { GetPostDto } from './dto/get-post.dto';
import { UploadPostDto } from './dto/upload-post.dto';
import { EditPostDto } from './dto/edit-post.dto';
import { RemovePostDto } from './dto/remove-post.dto';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PostService } from './post.service';
import { GetPostListDto } from './dto/get-post-list.dto';

@ApiTags('posts')
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}
  @ApiOperation({ summary: 'get post by id' })
  @ApiResponse({
    status: 200,
    description: 'Query successfully completed',
    type: GetPostDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @Get(':id')
  async getPost(@Param('id') stringId: string): Promise<GetPostDto> {
    return this.postService.getPostByStringId(stringId);
  }

  @ApiOperation({ summary: 'get a list of posts' })
  @ApiResponse({
    status: 200,
    description: 'Query successfully completed',
    type: GetPostListDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiQuery({
    name: 'login',
    type: String,
    description:
      'Specify authors login to only get a list of their posts with their login and name excluded from JSON data',
    required: false,
  })
  @Get()
  async getUserPosts(@Query('login') login?: string): Promise<GetPostListDto> {
    if (typeof login !== 'undefined') {
      return this.postService.getUserPostListDtoByLogin(login);
    }
    return this.postService.getGeneralPostListDto();
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
  @Post()
  async uploadPost(@Body() request: UploadPostDto): Promise<string> {
    return this.postService.uploadPost(request);
  }

  @ApiOperation({ summary: 'edit a post' })
  @ApiResponse({
    status: 200,
    description: 'Post successfully edited',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @Patch()
  async editPost(@Body() request: EditPostDto) {
    await this.postService.editPost(request);
  }

  @ApiOperation({ summary: 'remove a post' })
  @ApiResponse({
    status: 200,
    description: 'Post successfully removed',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @Delete()
  async removePost(@Body() request: RemovePostDto) {
    return await this.postService.removePost(request);
  }
}
