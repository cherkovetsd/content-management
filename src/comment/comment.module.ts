import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { ProfileModule } from '../profile/profile.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [ProfileModule, PrismaModule],
  controllers: [CommentController],
  providers: [CommentService],
  exports: [CommentService],
})
export class CommentModule {}
