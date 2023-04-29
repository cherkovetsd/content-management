import { Controller, Get, Render } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('app')
@Controller()
export class OpenController {
  @ApiOperation({ summary: 'load posts webpage' })
  @ApiResponse({
    status: 201,
    description: 'Loaded successfully',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @Get('open')
  @Render('open')
  root() {
    return { message: 'Hello world!11' };
  }
}
