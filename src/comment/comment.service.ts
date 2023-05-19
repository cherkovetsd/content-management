import { Injectable, NotImplementedException } from '@nestjs/common';
import { GetCommentDto } from './dto/get-comment.dto';
import { GetCommentListDto } from './dto/get-comment-list.dto';
import { PrismaService } from '../prisma/prisma.service';
import { UploadCommentDto } from './dto/upload-comment.dto';
import { EditCommentDto } from './dto/edit-comment.dto';
import { RemoveCommentDto } from './dto/remove-comment.dto';

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) {}

  private async convertCommentRecordToDto(comment): Promise<GetCommentDto> {
    const author = await this.prisma.user.findUniqueOrThrow({
      where: { id: comment.authorId },
    });

    const post = await this.prisma.post.findUniqueOrThrow({
      where: { id: comment.postId },
    });

    return {
      authorLogin: author['login'],
      fullName: author['name'],
      postId: post['stringId'],
      postHeadline: post['headline'],
      text: comment.text,
    };
  }

  async getCommentById(id: number): Promise<GetCommentDto> {
    const dbComment = await this.prisma.comment.findUniqueOrThrow({
      where: { id: id },
    });

    return this.convertCommentRecordToDto(dbComment);
  }

  async getCommentByStringId(stringId: string): Promise<GetCommentDto> {
    const dbComment = await this.prisma.comment.findUniqueOrThrow({
      where: { stringId: stringId },
    });

    return this.convertCommentRecordToDto(dbComment);
  }

  private async convertCommentListToDto(
    commentList,
    omitPost = false,
    omitUser = false,
  ): Promise<GetCommentListDto> {
    const commentListDto: GetCommentDto[] = await Promise.all(
      commentList.map(async (comment): Promise<GetCommentDto> => {
        const user = omitUser
          ? null
          : await this.prisma.user.findUniqueOrThrow({
              where: { id: comment['authorId'] },
            });

        const post = omitPost
          ? null
          : await this.prisma.post.findUniqueOrThrow({
              where: { id: comment['postId'] },
            });

        if (omitUser) {
          return {
            postId: post['stringId'],
            postHeadline: post['headline'],
            text: comment.text,
            stringId: comment.stringId,
          };
        } else {
          return {
            authorLogin: user['login'],
            fullName: user['name'],
            text: comment.text,
          };
        }
      }),
    );

    return { comments: commentListDto };
  }
  private async getUserCommentsById(userId: number) {
    return await this.prisma.comment.findMany({
      where: { authorId: userId },
    });
  }

  private async getUserCommentsByLogin(login: string) {
    const user = await this.prisma.user.findUniqueOrThrow({
      where: { login: login },
    });

    return await this.getUserCommentsById(user['id']);
  }

  private async getPostCommentsById(postId: number) {
    return await this.prisma.comment.findMany({
      where: { postId: postId },
    });
  }

  private async getPostCommentsByStringId(stringId: string) {
    const post = await this.prisma.post.findUniqueOrThrow({
      where: { stringId: stringId },
    });

    return await this.getPostCommentsById(post['id']);
  }

  async getUserCommentListDtoById(userId: number) {
    return this.convertCommentListToDto(
      await this.getUserCommentsById(userId),
      false,
      true,
    );
  }

  async getUserCommentListDtoByLogin(login: string) {
    return this.convertCommentListToDto(
      await this.getUserCommentsByLogin(login),
      false,
      true,
    );
  }

  async getPostCommentListDtoById(postId: number) {
    return this.convertCommentListToDto(
      await this.getPostCommentsById(postId),
      true,
      false,
    );
  }

  async getPostCommentListDtoByStringId(stringId: string) {
    return this.convertCommentListToDto(
      await this.getPostCommentsByStringId(stringId),
      true,
      false,
    );
  }

  async uploadComment(uploadDto: UploadCommentDto): Promise<string> {
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
      (await this.prisma.comment.findFirst({
        where: { stringId: newStringId },
      })) != null
    );

    const author = await this.prisma.user.findUniqueOrThrow({
      where: { login: uploadDto.login },
    });

    const post = await this.prisma.post.findUniqueOrThrow({
      where: { stringId: uploadDto.postId },
    });

    await this.prisma.comment.create({
      data: {
        stringId: newStringId,
        authorId: author['id'],
        postId: post['id'],
        text: uploadDto.text,
      },
    });

    return newStringId;
  }

  async removeComment(removeDto: RemoveCommentDto) {
    await this.prisma.comment.delete({
      where: { stringId: removeDto.commentId },
    });
  }

  async editComment(editDto: EditCommentDto) {
    const comment = await this.prisma.comment.findUniqueOrThrow({
      where: { stringId: editDto.commentId },
    });

    await this.prisma.comment.update({
      where: { id: comment['id'] },
      data: {
        stringId: comment['stringId'],
        authorId: comment['authorId'],
        text: editDto.text,
      },
    });
  }
}
