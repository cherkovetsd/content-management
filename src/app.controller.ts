import { Get, Controller, Render, UseInterceptors } from '@nestjs/common';
import { LoadingInterceptor } from './loading.interceptor';

@Controller()
export class AppController {
  @Get()
  @Render('index')
  root() {
    return { message: 'Hello world!' };
  }
}
