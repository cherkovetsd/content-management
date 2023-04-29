import { Controller, Get, Render } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('app')
@Controller()
export class UploadController {
  @ApiOperation({ summary: 'load posts upload webpage' })
  @ApiOperation({ summary: 'create user' })
  @ApiOperation({ summary: 'create user' })
  @ApiResponse({
    status: 201,
    description: 'Loaded successfully',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @Get('upload')
  @Render('upload')
  async root() {
    return { message: 'Hello world!11' };
  }
}
