import { IsEmail, IsString } from 'class-validator';

export class UpdateUserDto {
    @IsString()
    name: string;

    @IsString()
    password: string;

    @IsEmail()
    email: string;

    @IsString()
    gender: string;

    @IsString()
    phone: string;
}
