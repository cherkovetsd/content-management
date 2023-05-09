import { Get, Controller, Render } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from "./app.service";

@ApiTags('app')
@Controller('app')
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
  @Get('comment')
  @Render('comments')
  async loadCommentPage() {
    return { message: 'Hello world!11' };
  }

  @ApiOperation({ summary: 'load posts webpage' })
  @ApiResponse({
    status: 201,
    description: 'Loaded successfully',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @Get('open')
  @Render('open')
  async loadOpenPage() {
    return { message: 'Hello world!11' };
  }

  @ApiOperation({ summary: 'load posts upload webpage' })
  @ApiResponse({
    status: 201,
    description: 'Loaded successfully',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @Get('upload')
  @Render('upload')
  async loadUploadPage() {
    return { message: 'Hello world!11' };
  }
}
