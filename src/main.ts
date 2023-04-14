import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import * as hbs from 'hbs';
import { LoadingInterceptor } from './loading.interceptor';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalInterceptors(new LoadingInterceptor());
  hbs.registerPartials(join(__dirname, '..', 'views', 'partials'));
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  if ('PORT' in process.env) await app.listen(process.env.PORT);
  else await app.listen(3000);
}
bootstrap();
