import { ArrayNotEmpty, IsArray, IsBoolean, IsNumber, IsOptional, IsPositive, IsString, Min, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePropertyDto {
  @ApiProperty({ description: 'Number of bathrooms in the property', example: 2 })
  @IsNumber()
  @Min(1, { message: 'Bathrooms must be at least 1' })
  bathrooms: number;

  @ApiProperty({ description: 'Number of bedrooms in the property', example: 3 })
  @IsNumber()
  @Min(1, { message: 'Bedrooms must be at least 1' })
  bedrooms: number;

  @ApiProperty({ description: 'Number of parking spots available', example: 1 })
  @IsNumber()
  @Min(0, { message: 'Parking spots cannot be negative' })
  parkingSpots: number;

  @ApiProperty({ description: 'Name or title of the property', example: 'Casa en Alto Prado' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Number of floors in the property', example: 1 })
  @IsNumber()
  @Min(1, { message: 'Property must have at least 1 floor' })
  floors: number;

  @ApiProperty({ description: 'Indicates if the property is an apartment', example: true })
  @IsBoolean()
  isApartment: boolean;

  @ApiProperty({ description: 'Floor number if the property is an apartment', example: 5 })
  @IsNumber()
  @Min(0, { message: 'Floor number must be at least 0' })
  floorNmr: number;

  @ApiProperty({ description: 'List of image URLs for the property', example: ['https://image.url'] })
  @IsArray()
  @ArrayNotEmpty({ message: 'Property must have at least one image' })
  @IsString({ each: true, message: 'Each image URL must be a string' })
  images: string[];

  @ApiProperty({ description: 'Detailed description of the property', example: 'Spacious 3-bedroom house with a pool' })
  @IsString()
  description: string;

  @ApiProperty({ description: 'Status of the property, such as "Available" or "Sold"', example: 'Available' })
  @IsString()
  status: string;

  @ApiProperty({ description: 'Price of the property in USD', example: 300000 })
  @IsNumber()
  price: number;

  @ApiProperty({ description: 'City where the property is located', example: 'Los Angeles' })
  @IsString()
  city: string;

  @ApiProperty({ description: 'Zone or area within the city', example: 'Downtown' })
  @IsString()
  zone: string;

  @ApiProperty({ description: 'Municipality of the property', example: 'LA County' })
  @IsString()
  municipality: string;

  @ApiProperty({ description: 'Latitude of the property, can be null', example: '34.052235', required: false })
  @IsString()
  @IsOptional()
  latitud: string | null;

  @ApiProperty({ description: 'Longitude of the property, can be null', example: '-118.243683', required: false })
  @IsString()
  @IsOptional()
  longitud: string | null;
 
}