import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, TDUser } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import * as bcrypt from 'bcrypt';
import { BaseService } from 'src/common/service/base.serivce';

@Injectable()
export class UserService extends BaseService<
  Prisma.TDUserCreateArgs,
  Prisma.TDUserUpdateInput
> {
  constructor(databaseService: DatabaseService) {
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
}
