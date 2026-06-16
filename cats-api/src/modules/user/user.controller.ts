import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Protected } from '../auth/decorators/protected.decorator';
import { UserResponseDto } from './dto';
import { CurrentUser } from '../../common';

@ApiBearerAuth()
@Protected()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: 'Get user profile',
    description: 'Return user profile'
  })
  @ApiOkResponse({
    type: UserResponseDto
  })
  @Get('@me')
  @HttpCode(HttpStatus.OK)
  public getProfile(@CurrentUser() userId: string): Promise<UserResponseDto> {
    return this.userService.getProfile(userId);
  }
}
