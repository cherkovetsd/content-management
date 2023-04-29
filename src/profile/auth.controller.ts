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
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('profile')
@Controller('auth')
export class AuthController {
  @ApiOperation({
    summary: 'provide a login-password combination and request a session token',
  })
  @ApiResponse({
    status: 201,
    description: 'User session initiated',
    type: String,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @Post()
  async login(@Body() loginInfo: LoginInfoDto): Promise<string> {
    throw new NotImplementedException();
  }
}
