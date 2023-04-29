import { Controller, Get, Render } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('app')
@Controller()
export class CommentsController {
  @ApiOperation({ summary: 'load comments webpage' })
  @ApiResponse({
    status: 201,
    description: 'Loaded successfully',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @Get('comments')
  @Render('comments')
  async root() {
    return { message: 'Hello world!11' };
  }
}
