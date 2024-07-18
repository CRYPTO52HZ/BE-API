import { Body, Controller, Get, Post } from '@nestjs/common';
import { WalletTypeService } from './wallet-type.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateWalletTypeDto } from './dto/create-wallet-type.dto';
import { ApiOperationDecorator } from 'src/common/decorator/api-operation.decorator';

@ApiTags('Wallet Type')
@ApiBearerAuth('access-token')
@Controller('wallet-type')
export class WalletTypeController {
  constructor(private walletTypeService: WalletTypeService) {}

  @ApiOperationDecorator({
    summary: 'Create new wallet type successfully',
    description: 'Create new wallet type',
  })
  @Post('/create')
  async createType(@Body() data: CreateWalletTypeDto) {
    return await this.walletTypeService.createType(data);
  }

  @ApiOperationDecorator({
    summary: 'Get all wallet types successfully',
    description: 'Get all wallet types',
  })
  @Get('/all-wallet-types')
  async getAllWalletType() {
    return await this.walletTypeService.getAllWalletType();
  }
}
