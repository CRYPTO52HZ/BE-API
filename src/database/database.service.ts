import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { url } from 'inspector';
import config from 'src/configuration/index.config';

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit {
  constructor() {
    const databaseUrl = `postgresql://${config.DATABASE_USER}:${config.DATABASE_PASSWORD}@${config.DATABASE_HOST}:${config.DATABASE_PORT}/${config.DATABASE_NAME}?sslmode=require`;
    super({
      datasources: {
        db: {
          url: databaseUrl,
        },
      },
    });
  }
  async onModuleInit() {
    await this.$connect();
  }
}
