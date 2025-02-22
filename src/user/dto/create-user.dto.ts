import { IsString, IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'Profile picture URL of the user', example: 'https://profilepicture.url' })
  @IsOptional()
  @IsString()
  profilePicture?: string;

  @ApiProperty({ description: 'Name of the user', example: 'John Doe' })
  @IsString()
  @IsNotEmpty({ message: 'Name cannot be empty' })
  name: string;

  @ApiProperty({ description: 'Password for the user', example: 'password123' })
  @IsString()
  password: string;

  @ApiProperty({ description: 'Gender of the user', example: 'male' })
  @IsString()
  gender: string;

  @ApiProperty({ description: 'Email of the user', example: 'johndoe@example.com' })
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @ApiProperty({ description: 'Phone number of the user', example: '+1234567890' })
  phone: string;
}