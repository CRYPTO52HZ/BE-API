import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateWalletTypeDto {
  @ApiProperty({
    example: 'Spot',
    description: 'Name of the wallet',
  })
  @IsString()
  @IsNotEmpty()
  typeName: string;
}
