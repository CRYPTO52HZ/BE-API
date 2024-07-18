import { Controller } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller()
@ApiBearerAuth('access-token')
export class WalletController {
  constructor() {}
}
