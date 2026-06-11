import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ConfigService } from '@nestjs/config'
import { Logger, ValidationPipe } from '@nestjs/common'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	app.useGlobalPipes(
		new ValidationPipe({
			transform: true
		})
	)

	// Беру уже созданный экземпляр сервиса из контейнера приложения
	const config = app.get(ConfigService)
	const logger = new Logger()

	const swaggerConfig = new DocumentBuilder()
		.setTitle('Cats')
		.setDescription('The cats API description')
		.setVersion('1.0')
		.addTag('cats')
		.build()
	const documentFactory = () =>
		SwaggerModule.createDocument(app, swaggerConfig)
	SwaggerModule.setup('/docs', app, documentFactory)

	const host = config.getOrThrow<string>('HTTP_HOST')
	const port = config.getOrThrow<number>('HTTP_PORT')

	await app.listen(port ?? 3000)

	logger.log(`App started on ${host}`)
	logger.log(`Swagger: ${host}/docs`)
}
bootstrap()
