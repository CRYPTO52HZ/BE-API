import { Module } from '@nestjs/common';
import { WalletTypeController } from './wallet-type.controller';
import { WalletTypeService } from './wallet-type.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [WalletTypeController],
  providers: [WalletTypeService],
  exports : [WalletTypeService]
})
export class WalletTypeModule {}
