import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, TDUser } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import * as bcrypt from 'bcrypt';
import { BaseService } from 'src/common/service/base.serivce';
import { catchError, firstValueFrom, lastValueFrom, map } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import * as Crypto from 'crypto';

@Injectable()
export class UserService extends BaseService<
  Prisma.TDUserCreateArgs,
  Prisma.TDUserUpdateInput
> {
  constructor(
    databaseService: DatabaseService,
    private readonly httpService: HttpService,
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

  generateSignature(params: string, apiSecret: string) {
    const key = Buffer.from(apiSecret, 'utf8');
    const hmac = Crypto.createHmac('sha256', key);
    hmac.update(params, 'utf8');
    const digest = hmac.digest('hex');
    return digest;
  }

  //add keys for user
  async addKeysOfThirdParty(
    apiKey: string,
    apiSecret: string,
    endPoint: string,
  ) {
    try {
      const baseUrl = process.env.BASE_URL_THIRD_PARTY;
      const timestamp = Number(new Date());
      let params = `recvWindow=${process.env.RECVWINDOW}&timestamp=${timestamp}`;
      const signature = this.generateSignature(params, apiSecret);
      params += `&signature=${signature}`;
      const fullUrl = `${baseUrl}/${endPoint}?${params}`;
      console.log(fullUrl);
      const request = this.httpService.get(fullUrl, {
        headers: {
          'X-MBX-APIKEY': apiKey,
        },
      });
      const response = await lastValueFrom(request);
      if (response.status == 200) {
        // return this.databaseService.tDUser.update({
        //   where : {

        //   },
        //   data : {
        //     apiKey : apiKey,
        //     apiSecret : apiSecret
        //   }
        // })
      } else {
        throw new NotFoundException(response.statusText);
      }
    } catch (error) {
      throw new NotFoundException(error);
    }
  }
  //add keys for user
}
