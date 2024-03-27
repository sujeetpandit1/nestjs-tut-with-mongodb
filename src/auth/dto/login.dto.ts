import { IsNotEmpty, IsString, IsNumber, IsEnum, IsEmail, MinLength, MaxLength } from 'class-validator';

export class LoginDto {

    @IsNotEmpty()
    @IsEmail({}, { message: 'Invalid email' })
    readonly email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @MaxLength(18)
    readonly password: string;


}
