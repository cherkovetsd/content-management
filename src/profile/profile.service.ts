import { Injectable, NotImplementedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProfileService {
  constructor(private prisma: PrismaService) {}
  async GetFullName(userId: number): Promise<string> {
    throw new NotImplementedException();
  }

  async GetUserId(login: string): Promise<number> {
    throw new NotImplementedException();
  }

  async GetUserLogin(userId: number): Promise<string> {
    throw new NotImplementedException();
  }
}
