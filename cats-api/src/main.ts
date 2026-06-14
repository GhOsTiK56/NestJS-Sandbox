import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import {
  ClassSerializerInterceptor,
  Logger,
  ValidationPipe
} from '@nestjs/common';
import { loggerMiddleware } from './common/middlewares/logger.middleware';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true
      }
    })
  );

  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  // Беру уже созданный экземпляр сервиса из контейнера приложения
  const config = app.get(ConfigService);
  const logger = new Logger();

  // OpenAPI Swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Cats API')
    .setDescription('API documentation for Cats')
    .setVersion('1.0.0')
    .setContact(
      'Ghostik',
      'https://github.com/GhOsTiK56/NestJS-Sandbox',
      'karenheister5@gmail.com'
    )
    .addBearerAuth()
    .setVersion('1.0')
    .build();

  const documentFactory = () =>
    SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('/docs', app, documentFactory, {
    customSiteTitle: 'Cats-api',
    jsonDocumentUrl: '/docs-json'
  });

  const host = config.getOrThrow<string>('HTTP_HOST');
  const port = config.getOrThrow<number>('HTTP_PORT');

  app.use(loggerMiddleware);
  await app.listen(port ?? 3000);

  logger.log(`App started on ${host}`);
  logger.log(`Swagger: ${host}/docs`);
}
bootstrap();
