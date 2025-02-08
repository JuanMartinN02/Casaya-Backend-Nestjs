import { IsNumber, IsString } from "class-validator";

export class CreatePropertyDto {
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
