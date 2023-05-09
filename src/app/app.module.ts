import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from '../post/post.module';
import { CommentModule } from '../comment/comment.module';
import { ProfileModule } from '../profile/profile.module';

@Module({
  imports: [PostModule, CommentModule, ProfileModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
