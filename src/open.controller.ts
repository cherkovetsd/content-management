import { Controller, Get, Render } from "@nestjs/common";

@Controller()
export class OpenController {
  @Get('open')
  @Render('open')
  root() {
    return { message: 'Hello world!11' };
  }
}
