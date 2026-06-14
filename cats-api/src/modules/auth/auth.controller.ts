import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation
} from '@nestjs/swagger';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Protected } from './decorators/protected.decorator';
import {
  LoginReqeustDto,
  RefreshReqeustDto,
  RegisterRequestDto,
  TokensResponseDto
} from './dto';
import { OkResponseDto } from '../../common/dto';

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
  public async register(
    @Body() data: RegisterRequestDto
  ): Promise<TokensResponseDto> {
    return await this.authService.register(data);
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
  public async login(
    @Body() data: LoginReqeustDto
  ): Promise<TokensResponseDto> {
    return await this.authService.login(data);
  }

  @ApiOperation({
    summary: 'Get new refresh and access tokens',
    description: 'Return new refresh and access tokens'
  })
  @ApiOkResponse({
    description: 'return access token',
    type: RefreshReqeustDto
  })
  @Post('refresh')
  public async refresh(
    @Body() data: RefreshReqeustDto
  ): Promise<RefreshReqeustDto> {
    return await this.authService.refresh(data.refreshToken);
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
  public async logout(@CurrentUser() userId: string): Promise<OkResponseDto> {
    return await this.authService.logout(userId);
  }
}
