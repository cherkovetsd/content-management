import { Injectable, NotImplementedException } from '@nestjs/common';
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
      include: { tags: true },
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
          commentCnt: post['comments'].length,
          stringId: post['stringId'],
        };
      }),
    );

    return { posts: postListDto };
  }

  private async getFilteredPosts(
    skip: number,
    take: number,
    authorLogin?: string,
    fullName?: string,
    headline?: string,
    description?: string,
    tag?: string,
  ) {
    const filter: any = {};

    if (typeof authorLogin !== 'undefined' || typeof fullName !== 'undefined') {
      filter.author = {};
      if (typeof authorLogin !== 'undefined') {
        filter.author.login = authorLogin;
      }
      if (typeof fullName !== 'undefined') {
        filter.author.name = fullName;
      }
    }

    if (typeof headline !== 'undefined') {
      filter.headline = { contains: headline, mode: 'insensitive' };
    }

    if (typeof description !== 'undefined') {
      filter.description = { contains: description, mode: 'insensitive' };
    }

    if (typeof tag !== null) {
      filter.tags = { some: { name: tag } };
    }

    return await this.prisma.post.findMany({
      where: filter,
      include: { tags: true, comments: true },
      skip: skip,
      take: take,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getFilteredPostListDto(
    skip: number,
    take: number,
    authorLogin?: string,
    fullName?: string,
    headline?: string,
    description?: string,
    tag?: string,
  ) {
    return this.convertPostListToDto(
      await this.getFilteredPosts(
        skip,
        take,
        authorLogin,
        fullName,
        headline,
        description,
        tag,
      ),
    );
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
      },
    });
  }
}
