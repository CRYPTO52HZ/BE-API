import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class UserAddKeysDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'c1190246c854f0c5cabc136a6d6477cfd0397bb4d1c8c1564e80d7853d7bd337',
  })
  apiKey: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '485a1c2aeab09ef00b7d4f5371aba2e41c796a72f63204e7338247a819d9a318',
  })
  apiSecret: string;
}
