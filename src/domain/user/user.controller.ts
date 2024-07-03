import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBadRequestResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiOperationDecorator } from 'src/common/decorator/api-operation.decorator';
import { CreateUserDto } from './dto/create-user.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userSerice: UserService) {}

  @ApiOperationDecorator({
    summary: 'Create a new user',
    description: 'Create a new user',
  })
  @Post('/register')
  register(@Body() data: CreateUserDto) {
    return this.userSerice.register(data);
  }
}
