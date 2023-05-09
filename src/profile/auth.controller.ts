import {
  Get,
  Controller,
  Render,
  UseInterceptors,
  Post,
  Body,
  NotImplementedException,
} from '@nestjs/common';
import { LoginInfoDto } from './dto/login-info.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@ApiTags('profile')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @ApiOperation({
    summary: 'provide a login-password combination to start user session',
  })
  @ApiResponse({
    status: 201,
    description: 'User session initiated',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @Post()
  async login(@Body() loginInfo: LoginInfoDto): Promise<void> {
    throw new NotImplementedException();
  }
}
