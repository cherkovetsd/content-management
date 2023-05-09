import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { ProfileModule } from '../profile/profile.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [ProfileModule, PrismaModule],
  controllers: [PostController],
  providers: [PostService],
  exports: [PostService],
})
export class PostModule {}
