import { IsString } from "class-validator";

export class CreateAddressDto {
    @IsString()
    name: string;

    @IsString()
    city: string;

    @IsString()
    zone: string;

    @IsString()
    municipality: string;
}
