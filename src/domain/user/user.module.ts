import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { DatabaseModule } from 'src/database/database.module';
import { HttpModule } from '@nestjs/axios';
import { BaseBinanceService } from 'src/common/service/binance-service/base-binance.service';

@Module({
  imports: [DatabaseModule, HttpModule],
  controllers: [UserController],
  providers: [UserService,BaseBinanceService],
  exports: [UserService],
})
export class UserModule {}
