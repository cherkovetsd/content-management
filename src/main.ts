import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  if ('PORT' in process.env)
    await app.listen(process.env.PORT);
  else
    await app.listen(3000);
}
bootstrap();
