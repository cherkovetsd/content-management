import { BaseExceptionFilter, HttpAdapterHost, NestFactory } from "@nestjs/core";
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app/app.module';
import * as hbs from 'hbs';
import { LoadingInterceptor } from './app/loading.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { PrismaClientExceptionFilter } from "./prisma-client-exception/prisma-client-exception.filter";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalInterceptors(new LoadingInterceptor());
  hbs.registerPartials(join(__dirname, '..', 'views', 'partials'));
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  const config = new DocumentBuilder()
    .setTitle('my-blog')
    .setDescription('my blog API description')
    .setVersion('1.0')
    .addTag('app')
    .addTag('posts')
    .addTag('comment')
    .addTag('profile')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe());

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  if ('PORT' in process.env) await app.listen(process.env.PORT);
  else await app.listen(3000);
}
bootstrap();
