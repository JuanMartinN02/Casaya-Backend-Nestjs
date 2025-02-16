import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateAddressDto {
  @ApiProperty({ description: 'Name of the address', example: 'avenida 9' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'City where the address is located', example: 'Caracas' })
  @IsString()
  city: string;

  @ApiProperty({ description: 'Zone or area of the address', example: '...' })
  @IsString()
  zone: string;

  @ApiProperty({ description: 'Municipality of the address', example: 'Sucre' })
  @IsString()
  municipality: string;
}