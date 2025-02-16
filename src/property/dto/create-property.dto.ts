import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePropertyDto {
  @ApiProperty({ description: 'Number of bathrooms in the property', example: 2 })
  @IsNumber()
  bathrooms: number;

  @ApiProperty({ description: 'Number of bedrooms in the property', example: 3 })
  @IsNumber()
  bedrooms: number;

  @ApiProperty({ description: 'Number of parking spots available', example: 1 })
  @IsNumber()
  parkingSpots: number;

  @ApiProperty({ description: 'Name or title of the property', example: 'Casa en Alto prado' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Number of floors in the property', example: 1 })
  @IsNumber()
  floors: number;

  @ApiProperty({ description: 'ID of the address for the property', example: 101 })
  @IsNumber()
  address_id: number;
}