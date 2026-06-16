import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation
} from '@nestjs/swagger';
import { Protected } from './decorators/protected.decorator';
import {
  LoginRequestDto,
  RefreshRequestDto,
  RegisterRequestDto,
  TokensResponseDto
} from './dto';
import { OkResponseDto } from '../../common/dto';
import { CurrentUser } from '../../common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'Register user',
    description: 'Register user'
  })
  @ApiCreatedResponse({
    description: 'return refresh & access tokens',
    type: TokensResponseDto
  })
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  public register(
    @Body() data: RegisterRequestDto
  ): Promise<TokensResponseDto> {
    return this.authService.register(data);
  }

  @ApiOperation({
    summary: 'Login to account',
    description: 'Login to account'
  })
  @ApiOkResponse({
    description: 'return refresh & access tokens',
    type: TokensResponseDto
  })
  @Post('login')
  public login(@Body() data: LoginRequestDto): Promise<TokensResponseDto> {
    return this.authService.login(data);
  }

  @ApiOperation({
    summary: 'Get new refresh and access tokens',
    description: 'Return new refresh and access tokens'
  })
  @ApiOkResponse({
    description: 'return access token',
    type: TokensResponseDto
  })
  @Post('refresh')
  public refresh(@Body() data: RefreshRequestDto): Promise<TokensResponseDto> {
    return this.authService.refresh(data.refreshToken);
  }

  @ApiOperation({
    summary: 'Logout',
    description: 'Logout'
  })
  @ApiOkResponse({
    description: 'Logout',
    type: OkResponseDto
  })
  @ApiBearerAuth()
  @Protected()
  @Post('logout')
  public logout(@CurrentUser() userId: string): Promise<OkResponseDto> {
    return this.authService.logout(userId);
  }
}
