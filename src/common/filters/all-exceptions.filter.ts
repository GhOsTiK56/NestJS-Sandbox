import {
  HttpException,
  Logger,
  type ArgumentsHost,
  type ExceptionFilter
} from '@nestjs/common';

import { Response } from 'express';

export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const context = host.switchToHttp();

    const response = context.getResponse<Response>();

    const status =
      exception instanceof HttpException ? exception.getStatus() : 500;

    const message =
      exception instanceof HttpException
        ? exception.message
        : 'Internal Server error';

    this.logger.error(message, exception);

    response.status(status).json({
      status,
      message,
      timestamp: new Date().toISOString(),
      path: context.getRequest().url
    });
  }
}
