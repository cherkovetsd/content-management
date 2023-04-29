import { Injectable, NotImplementedException } from '@nestjs/common';

@Injectable()
export class ProfileService {
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
