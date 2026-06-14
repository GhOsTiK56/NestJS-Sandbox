import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('App')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({
    summary: 'Welcome',
    description: 'Returns simple API welcome message'
  })
  @ApiOkResponse({ description: 'Return hello message' })
  @Get()
  @HttpCode(HttpStatus.OK)
  public getHello() {
    return this.appService.getHello();
  }

  @ApiOperation({
    summary: 'Health check',
    description: 'Checks if the Gateway is running'
  })
  @ApiOkResponse({ description: 'Return string if alive' })
  @Get('health')
  @HttpCode(HttpStatus.OK)
  public healthCheck() {
    return this.appService.healthCheck();
  }
}
