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
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { GetPostDto } from './dto/get-post.dto';
import { UploadPostDto } from './dto/upload-post.dto';
import { EditPostDto } from './dto/edit-post.dto';
import { RemovePostDto } from './dto/remove-post.dto';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PostService } from './post.service';
import { GetPostListDto } from './dto/get-post-list.dto';
import { IsNumberString } from 'class-validator';

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
    name: 'skip',
    type: String,
    description: 'Specify how many posts need to be skipped',
    required: true,
  })
  @ApiQuery({
    name: 'take',
    type: String,
    description: 'Specify how many posts need to be taken. No more than 10',
    required: true,
  })
  @ApiQuery({
    name: 'login',
    type: String,
    description: 'Filter by authors login',
    required: false,
  })
  @ApiQuery({
    name: 'fullName',
    type: String,
    description: 'Filter by authors full name',
    required: false,
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiQuery({
    name: 'headline',
    type: String,
    description: 'Filter by post headline',
    required: false,
  })
  @ApiQuery({
    name: 'description',
    type: String,
    description: 'Specify words contained in post description',
    required: false,
  })
  @ApiQuery({
    name: 'tag',
    type: String,
    description: 'Filter by tag',
    required: false,
  })
  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  async getFilteredPosts(
    @Query('skip') skip: number,
    @Query('take') take: number,
    @Query('login') login?: string,
    @Query('fullName') fullName?: string,
    @Query('headline') headline?: string,
    @Query('description') description?: string,
    @Query('tag') tag?: string,
  ): Promise<GetPostListDto> {
    return this.postService.getFilteredPostListDto(
      skip,
      take,
      login,
      fullName,
      headline,
      description,
      tag,
    );
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
