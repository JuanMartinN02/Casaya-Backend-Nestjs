import { PartialType } from '@nestjs/mapped-types';
import { CreatePropertyDto } from './create-property.dto';
import { IsNumber, IsString } from 'class-validator';

export class UpdatePropertyDto {
    @IsNumber()
    bathrooms: number;

    @IsNumber()
    bedrooms: number;

    @IsNumber()
    parkingSpots: number;

    @IsString()
    name: string;

    @IsNumber()
    floors: number;
}
