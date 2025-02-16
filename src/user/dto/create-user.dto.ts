import { IsString, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'Full name of the user', example: 'Jose' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Password for the user account', example: 'StrongP@ssw0rd!' })
  @IsString()
  password: string;

  @ApiProperty({ description: 'Email address of the user', example: 'joseg@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Gender of the user', example: 'male' })
  @IsString()
  gender: string;

  @ApiProperty({ description: 'Phone number of the user', example: '0412445345' })
  @IsString()
  phone: string;
}