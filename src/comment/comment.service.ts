import { Injectable, NotImplementedException } from '@nestjs/common';
import { Post } from '../post/post.interface';
import { GetCommentDto } from './dto/get-comment.dto';
import { GetCommentListDto } from './dto/get-comment-list.dto';
import { GetPostDto } from "../post/dto/get-post.dto";

@Injectable()
export class CommentService {
  async getComment(postId: number): Promise<Post> {
    throw new NotImplementedException();
  }

  async getCommentIdFromStringId(postId: string): Promise<number> {
    throw new NotImplementedException();
  }

  async convertCommentToDto(comment: Comment): Promise<GetCommentDto> {
    throw new NotImplementedException();
  }

  async getUserComments(userId: number): Promise<string[]> {
    throw new NotImplementedException();
  }

  async convertCommentListToDto(comment: Comment): Promise<GetCommentListDto> {
    throw new NotImplementedException();
  }

  async uploadComment(comment: Comment) {
    throw new NotImplementedException();
  }

  async removeComment(commentId: string): Promise<boolean> {
    throw new NotImplementedException();
  }

  async editComment(commentId: string, newComment: Comment): Promise<boolean> {
    throw new NotImplementedException();
  }
}
