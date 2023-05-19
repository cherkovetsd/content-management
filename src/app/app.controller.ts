import { Get, Controller, Render, Param, Query } from "@nestjs/common";
import {
  ApiExcludeController,
  ApiOperation, ApiQuery,
  ApiResponse,
  ApiTags
} from "@nestjs/swagger";

@ApiTags('app')
@ApiExcludeController()
@Controller()
export class AppController {
  @ApiOperation({ summary: 'load index webpage' })
  @ApiResponse({
    status: 201,
    description: 'Loaded successfully',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @Get()
  @Render('index')
  async loadIndexPage() {
    return { message: 'Hello world!' };
  }

  @ApiOperation({ summary: 'load comments webpage' })
  @ApiResponse({
    status: 201,
    description: 'Loaded successfully',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @Get('my-comments/:id')
  @Render('my-comments')
  async loadCommentPage(@Param('id') id: string) {
    return { id: id };
  }

  @ApiOperation({ summary: 'load posts webpage' })
  @ApiResponse({
    status: 201,
    description: 'Loaded successfully',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @Get('open/:id')
  @Render('open')
  async loadPostPage(@Param('id') id: string) {
    return { id: id };
  }

  @ApiOperation({ summary: 'load posts webpage' })
  @ApiResponse({
    status: 201,
    description: 'Loaded successfully',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiQuery({
    name: 'id',
    type: String,
    description: 'Post id',
    required: false,
  })
  @Get('open/')
  @Render('open')
  async loadEmptyPostPage(@Query('id') id: string) {
    if (typeof id !== 'undefined') {
      return { id: id };
    } else {
      return { id: '' };
    }
  }

  @ApiOperation({ summary: 'load my-posts webpage' })
  @ApiResponse({
    status: 201,
    description: 'Loaded successfully',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @Get('my-posts/:login')
  @Render('my-posts')
  async loadMyPostsPage(@Param('login') login: string) {
    return { login: login };
  }

  @ApiOperation({ summary: 'load posts upload webpage' })
  @ApiResponse({
    status: 201,
    description: 'Loaded successfully',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @Get('upload')
  @Render('upload')
  async loadUploadPage() {
    return { message: 'Hello world!11' };
  }
}
