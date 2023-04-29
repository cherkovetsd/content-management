import { LoginInfo } from '../auth.interface';
import { ApiProperty } from '@nestjs/swagger';

export class LoginInfoDto implements LoginInfo {
  @ApiProperty()
  login: string;
  @ApiProperty()
  password: string;
}
