import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit
} from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from 'prisma/generated/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name);

  public constructor() {
    const databaseUrl = process.env.DATABASE_URI;

    if (!databaseUrl) {
      throw new Error('DATABASE_URI is not defined');
    }

    const adapter = new PrismaPg(databaseUrl);

    super({ adapter });
  }

  async onModuleInit() {
    const start = Date.now();
    this.logger.log(`Connecting to database...`);

    try {
      await this.$connect();

      const ms = Date.now() - start;

      this.logger.log(`Database connection established (time=${ms}ms)`);
    } catch (error) {
      this.logger.error(`Connecting to database failde with: `, error);
      throw error;
    }
  }

  async onModuleDestroy() {
    this.logger.log(`Disconnecting from database...`);

    try {
      await this.$disconnect();

      this.logger.log(`Database connection closed`);
    } catch (error) {
      this.logger.error(`Disconnecting from database failde with: `, error);
    }
  }
}
