import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class UploadController {
  @Get('upload')
  @Render('upload')
  root() {
    return { message: 'Hello world!11' };
  }
}
