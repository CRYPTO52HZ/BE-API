import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UserService {
  constructor(private databaseService: DatabaseService) {}
  register(data: Prisma.TDUserCreateInput) {
    const newUser  = {
      email  : data.email,
      username : data.username,
      phone : data.phone,
      password : data.password,
      timezoneCode : data.timezoneCode
    }
    return this.databaseService.tDUser.create({
      data : newUser,
    });
  }
}
