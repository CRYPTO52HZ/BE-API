import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { ApiOperationDecorator } from 'src/common/decorator/api-operation.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { UserReq } from 'src/common/decorator/user.decorator';
import { TDUser } from '@prisma/client';
import { Public } from 'src/common/decorator/public.decorator';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userSerice: UserService) {}

  @Public()
  @ApiOperationDecorator({
    summary: 'Create a new user',
    description: 'Create a new user',
  })
  @Post('/register')
  register(@Body() data: CreateUserDto) {
    return this.userSerice.register(data);
  }

  @Get('/me')
  getMe(@UserReq() user: TDUser) {
    return user;
  }
}
