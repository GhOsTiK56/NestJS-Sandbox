import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({
    summary: 'Welcome endPoint',
    description: 'Returns simple API welcome message'
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  public getHello() {
    return this.appService.getHello();
  }

  @ApiOperation({
    summary: 'Health check',
    description: 'Checks if the Gateway is running'
  })
  @Get('health')
  @HttpCode(HttpStatus.OK)
  public healthCheck() {
    return this.appService.healthCheck();
  }
}
