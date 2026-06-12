import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { CatsModule } from './cats/cats.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    // Объявляю подключение конфига глобально, чтобы не импортировать его
    // в каждом новом модуле
    ConfigModule.forRoot({
      isGlobal: true
    }),
    PrismaModule,
    CatsModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
