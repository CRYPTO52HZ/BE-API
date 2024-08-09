import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import * as bcrypt from 'bcrypt';
import { BaseService } from 'src/common/service/base.service';
import { BaseBinanceService } from 'src/common/service/base-binance.service';

@Injectable()
export class UserService extends BaseService<
  Prisma.TDUserCreateArgs,
  Prisma.TDUserUpdateInput
> {
  constructor(
    databaseService: DatabaseService,
    private readonly baseBinaceService: BaseBinanceService,
  ) {
    const modelName: string = 'TDUser';
    super(databaseService, modelName);
  }

  //register
  async register(data: Prisma.TDUserCreateInput) {
    const hashedPassword = await this.hashPassword(data.password);
    const newUser = {
      email: data.email,
      username: data.username,
      phone: data.phone,
      password: hashedPassword,
      timezoneCode: data.timezoneCode,
    };
    return this.create({ data: newUser });
  }
  //register

  //hash password
  async hashPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }
  //hash password

  //find by email
  async findOneByEmail(email: string) {
    const user = await this.databaseService.tDUser.findUnique({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
  //find by email

  //add keys for user
  async addKeysOfThirdParty(
    userId: string,
    apiKey: string,
    apiSecret: string,
    endPoint: string,
  ) {
    const fullUrl = this.baseBinaceService.genUrl(null, apiSecret, endPoint);
    const response = await this.baseBinaceService.binanceGet(apiKey, fullUrl);
    if (response.status == 200) {
      return await this.databaseService.tDUser.update({
        where: {
          userId: userId,
        },
        data: {
          apiKey: apiKey,
          apiSecret: apiSecret,
        },
      });
    }
  }
  //add keys for user
}
