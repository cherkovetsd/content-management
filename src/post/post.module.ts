import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { ProfileModule } from '../profile/profile.module';
import { PrismaModule } from '../prisma/prisma.module';
import { APP_FILTER } from '@nestjs/core';;

@Module({
  imports: [ProfileModule, PrismaModule],
  controllers: [PostController],
  providers: [PostService],
  exports: [PostService],
})
export class PostModule {}
