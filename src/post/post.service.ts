import { Injectable, NotImplementedException } from '@nestjs/common';
import { Post } from './post.interface';
import { GetPostDto } from './dto/get-post.dto';
import { PrismaService } from '../prisma/prisma.service';
import { UploadPostDto } from './dto/upload-post.dto';
import { RemovePostDto } from './dto/remove-post.dto';
import { EditPostDto } from './dto/edit-post.dto';
import { GetPostListDto } from './dto/get-post-list.dto';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}
  private async convertPostRecordToDto(post): Promise<GetPostDto> {
    const author = await this.prisma.user.findUniqueOrThrow({
      where: { id: post.authorId },
    });

    const tagStrings = post['tags'].map((tag) => tag['name']);

    return {
      login: author['login'],
      fullName: author['name'],
      headline: post['headline'],
      description: post['description'],
      imageUrls: post['images'],
      tags: tagStrings,
    };
  }

  async getPostById(id: number): Promise<GetPostDto> {
    const dbPost = await this.prisma.post.findUniqueOrThrow({
      where: { id: id },
    });

    return this.convertPostRecordToDto(dbPost);
  }

  async getPostByStringId(stringId: string): Promise<GetPostDto> {
    const dbPost = await this.prisma.post.findUniqueOrThrow({
      where: { stringId: stringId },
      include: { tags: true },
    });

    return this.convertPostRecordToDto(dbPost);
  }

  private async convertPostListToDto(
    postList,
    omitUser = false,
  ): Promise<GetPostListDto> {
    const postListDto: GetPostDto[] = await Promise.all(
      postList.map(async (post): Promise<GetPostDto> => {
        const user = omitUser
          ? null
          : await this.prisma.user.findUniqueOrThrow({
              where: { id: post['authorId'] },
            });

        return {
          login: omitUser ? '' : user['login'],
          fullName: omitUser ? '' : user['name'],
          headline: post['headline'],
          description: post['description'],
          imageUrls: post['images'],
          tags: post['tags'].map((tag) => tag['name']),
        };
      }),
    );

    return { posts: postListDto };
  }

  private async getUserPostsById(userId: number) {
    return await this.prisma.post.findMany({
      where: { authorId: userId },
      include: { tags: true },
    });
  }

  private async getUserPostsByLogin(login: string) {
    const user = await this.prisma.user.findUniqueOrThrow({
      where: { login: login },
    });

    return await this.getUserPostsById(user['id']);
  }

  private async getAllPosts() {
    return await this.prisma.post.findMany({
      include: { tags: true },
    });
  }

  async getUserPostListDtoById(userId: number) {
    return this.convertPostListToDto(await this.getUserPostsById(userId), true);
  }

  async getUserPostListDtoByLogin(login: string) {
    return this.convertPostListToDto(
      await this.getUserPostsByLogin(login),
      true,
    );
  }

  async getGeneralPostListDto() {
    return this.convertPostListToDto(await this.getAllPosts(), false);
  }

  async uploadPost(uploadDto: UploadPostDto): Promise<string> {
    const author = await this.prisma.user.findUniqueOrThrow({
      where: { login: uploadDto.login },
    });

    let newStringId = '';
    do {
      for (let i = 0; i < 6; i++) {
        const num = Math.floor(Math.random() * 62);
        if (num < 26) {
          newStringId += String.fromCharCode(num + 65);
        } else if (num < 52) {
          newStringId += String.fromCharCode(num + 97 - 26);
        } else {
          newStringId += String.fromCharCode(num + 48 - 52);
        }
      }
    } while (
      (await this.prisma.post.findFirst({
        where: { stringId: newStringId },
      })) != null
    );
    await this.prisma.post.create({
      data: {
        stringId: newStringId,
        authorId: author['id'],
        images: uploadDto.imageUrls,
        description: uploadDto.description,
        headline: uploadDto.headline,
        tags: {
          connectOrCreate: uploadDto.tags.map((tag) => {
            return {
              where: { name: tag },
              create: { name: tag },
            };
          }),
        },
      },
    });
    return newStringId;
  }

  async removePost(removeDto: RemovePostDto) {
    await this.prisma.post.delete({
      where: { stringId: removeDto.postId },
    });
  }

  async editPost(editDto: EditPostDto) {
    const post = await this.prisma.post.findUniqueOrThrow({
      where: { stringId: editDto.postId },
    });

    await this.prisma.post.update({
      where: { id: post['id'] },
      data: {
        images: editDto.imageUrls,
        description: editDto.description,
        headline: editDto.headline,
        tags: {
          connectOrCreate: editDto.tags.map((tag) => {
            return {
              where: { name: tag },
              create: { name: tag },
            };
          }),
        },
      },
    });
  }
}
