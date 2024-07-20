import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class WalletTypeService {
  constructor(private databaseService: DatabaseService) {}

  //create type wallet
  async createType(data: Prisma.TDWalletTypeCreateInput) {
    const newWalletType = {
      typeName: data.typeName,
    };
    return await this.databaseService.tDWalletType.create({
      data: newWalletType,
    });
  }
  //create type wallet

  //get all wallet type
  async getAllWalletType() {
    return await this.databaseService.tDWalletType.findMany();
  }
  //get all wallet type
}
