import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserSingInDto } from './dto/user-sign-in.dto';
import { ApiOperationDecorator } from 'src/common/decorator/api-operation.decorator';
import { Public } from 'src/common/decorator/public.decorator';

@Controller()
@ApiTags('Authentication')
@ApiBearerAuth()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @ApiOperationDecorator({
    summary: 'User sign in',
    description: 'User sign in',
  })
  @Post('/auth/sign-in')
  signIn(@Body() data: UserSingInDto) {
    return this.authService.signIn(data.email, data.password);
  }
}
