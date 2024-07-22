import { Controller } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller()
@ApiBearerAuth()
export class WalletController {
  constructor() {}
}
