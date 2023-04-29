import { Injectable, NotImplementedException } from '@nestjs/common';
import { LoginInfo } from './auth.interface';

@Injectable()
export class AuthService {
  GetAuthToken(loginInfo: LoginInfo): string {
    throw new NotImplementedException();
  }

  ValidateAuthToken(userId: number, authToken: string): boolean {
    throw new NotImplementedException();
  }
}
