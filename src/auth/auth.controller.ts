import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterRequestDto } from './dto/requests/register.request.dto';
import { ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'Register user',
    description: 'Register user'
  })
  @ApiCreatedResponse({
    description: 'return user'
  })
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() data: RegisterRequestDto) {
    return await this.authService.register(data);
  }
}
