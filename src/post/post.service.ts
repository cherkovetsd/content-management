import { Injectable, NotImplementedException } from "@nestjs/common";
import { Post } from './post.interface';
import { GetPostDto } from "./dto/get-post.dto";

@Injectable()
export class PostService {
  async getPostIdFromStringId(postId: string): Promise<number> {
    throw new NotImplementedException();
  }
  async getPost(postId: number): Promise<Post> {
    throw new NotImplementedException();
  }

  async convertPostToDto(post: Post): Promise<GetPostDto> {
    throw new NotImplementedException();
  }

  async uploadPost(post: Post) {
    throw new NotImplementedException();
  }

  async removePost(postId: string): Promise<boolean> {
    throw new NotImplementedException();
  }

  async editPost(postId: string, newPost: Post): Promise<boolean> {
    throw new NotImplementedException();
  }
}
