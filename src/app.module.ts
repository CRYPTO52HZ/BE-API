import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserModule } from './domain/user/user.module';
import { AuthModule } from './domain/auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AuthGuard } from './domain/auth/guard/auth.guard';
import { WalletTypeModule } from './domain/wallet-type/wallet-type.module';
import { ConfigModule } from '@nestjs/config';
import { validate } from './configuration/index.config';
import { LoggerMiddleware } from './middleware/logger.middlware';
import { HealthModule } from './domain/health/health.module';
import { LoggingInterceptor } from './interceptor/logging.interceptor';
import { SerializeInterceptor } from './interceptor/serialize.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate,
    }),
    HealthModule,
    UserModule,
    WalletTypeModule,
    AuthModule,
    DatabaseModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: SerializeInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
