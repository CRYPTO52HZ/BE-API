import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  IsTimeZone,
  MaxLength,
  MinLength,
} from 'class-validator';
import { IsPasswordMatching } from 'src/common/decorator/match.decorator';
import { ValidatePhone } from 'src/common/decorator/phone-valid.decorator';

export class CreateUserDto {
  @ApiProperty({
    example: 'abc@gmail.com',
    description: 'Email',
    uniqueItems: true,
    nullable: false,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(255)
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'abcd123',
    description: 'Username',
    uniqueItems: false,
    nullable: false,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(255)
  username: string;

  @ApiProperty({
    example: '0397363542',
    description: 'Phone number',
    uniqueItems: false,
    nullable: false,
  })
  @IsString()
  @ValidatePhone()
  @IsNotEmpty()
  @MinLength(7)
  @MaxLength(15)
  phone: string;

  @ApiProperty({
    example: 'h0397363542H@',
    description: 'Password',
    uniqueItems: false,
    nullable: false,
  })
  @IsStrongPassword()
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: 'h0397363542H@',
    description: 'Confirm password : must be the same with password',
    uniqueItems: false,
    nullable: false,
  })
  @IsStrongPassword()
  @IsString()
  @IsNotEmpty()
  @IsPasswordMatching('password')
  confirmPassword: string;

  @ApiProperty({
    example: 'Asia/Ho_Chi_Minh',
    description: 'Timezone',
    uniqueItems: false,
    nullable: false,
  })
  @IsString()
  @IsNotEmpty()
  @IsTimeZone()
  timezoneCode: string;
}
