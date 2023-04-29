import { Get, Controller, Render, UseInterceptors } from '@nestjs/common';
import { LoadingInterceptor } from './loading.interceptor';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('app')
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
  async root() {
    return { message: 'Hello world!' };
  }
}
