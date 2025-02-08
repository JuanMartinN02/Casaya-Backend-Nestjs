import { PartialType } from '@nestjs/mapped-types';
import { CreateAddressDto } from './create-address.dto';
import { IsString } from 'class-validator';

export class UpdateAddressDto {
    @IsString()
    address_id: number;
    
    @IsString()
    name: string;

    @IsString()
    city: string;

    @IsString()
    zone: string;

    @IsString()
    municipality: string;
}
