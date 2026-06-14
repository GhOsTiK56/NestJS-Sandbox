import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Protected } from '../auth/decorators/protected.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { UserProfileResponseDto } from './dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: 'Get user profile',
    description: 'Return user profile'
  })
  @ApiOkResponse({
    type: UserProfileResponseDto
  })
  @ApiBearerAuth()
  @Protected()
  @Get('@me')
  @HttpCode(HttpStatus.OK)
  public async getProfile(
    @CurrentUser() userId: string
  ): Promise<UserProfileResponseDto> {
    return await this.userService.getProfile(userId);
  }
}
