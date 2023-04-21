import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class CommentsController {
  @Get('comments')
  @Render('comments')
  root() {
    return { message: 'Hello world!11' };
  }
}
