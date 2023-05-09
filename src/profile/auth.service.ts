import { Injectable, NotImplementedException } from '@nestjs/common';
import { LoginInfo } from './auth.interface';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  CheckLoginInfo(loginInfo: LoginInfo): string {
    throw new NotImplementedException();
  }
}
