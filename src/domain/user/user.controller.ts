import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBadRequestResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userSerice: UserService) {}

  @ApiOperation({
    summary: 'Register new user',
  })
  @ApiBadRequestResponse({ description: 'Register failed' })
  @Post('/register')
  register(@Body() data: any) {
    this.userSerice.register(data);
  }
}
