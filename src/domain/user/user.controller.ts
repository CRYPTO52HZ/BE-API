import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ApiOperationDecorator } from 'src/common/decorator/api-operation.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { UserReq } from 'src/common/decorator/user.decorator';
import { TDUser } from '@prisma/client';
import { Public } from 'src/common/decorator/public.decorator';
import { UserAddKeysDto } from './dto/add-keys.dto';

@ApiTags('User')
@Controller('user')
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @ApiOperationDecorator({
    summary: 'Create a new user',
    description: 'Create a new user',
  })
  @Post('/register')
  register(@Body() data: CreateUserDto) {
    return this.userService.register(data);
  }

  @ApiOperationDecorator({
    summary: 'Get all users success',
    description: 'Get all users',
  })
  @Get('/all-users')
  allUsers() {
    return this.userService.findMany();
  }

  @Get('/me')
  getMe(@UserReq() user: TDUser) {
    return user;
  }

  @ApiOperationDecorator({
    summary: 'Add keys succes',
    description: 'Add keys (api / secret) for user',
  })
  @Post('/add-keys')
  addKeys(@Body() body: UserAddKeysDto) {
    const endpoint: string = 'fapi/v3/account';
    return this.userService.addKeysOfThirdParty(
      body.userId,
      body.apiKey,
      body.apiSecret,
      endpoint,
    );
  }
}
