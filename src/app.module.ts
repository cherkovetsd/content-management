import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OpenController } from './open.controller';
import { UploadController } from './upload.controller';
import { CommentsController } from './comments.controller';

@Module({
  imports: [],
  controllers: [
    AppController,
    OpenController,
    UploadController,
    CommentsController,
  ],
  providers: [AppService],
})
export class AppModule {}
