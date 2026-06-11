import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    return { message: 'Hello World!' }
  }

  healthCheck() {
    return { status: 'ok', timestamp: new Date().toISOString() }
  }
}
