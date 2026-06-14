import { Module } from '@nestjs/common';
import { CatsService } from './cat.service';
import { CatsController } from './cat.controller';

@Module({
  controllers: [CatsController],
  providers: [CatsService]
})
export class CatsModule {}
