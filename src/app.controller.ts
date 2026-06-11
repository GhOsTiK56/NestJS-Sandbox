import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

/*
Контроллер отвечает за обработку запросов и отправку ответов обрабно клиенту
*/

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello() {
    return this.appService.getHello();
  }

  @Get('health')
  public healthCheck() {
    return this.appService.healthCheck()
  }
}
