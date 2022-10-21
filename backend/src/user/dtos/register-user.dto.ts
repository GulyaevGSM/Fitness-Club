import {IsEmail, IsString, MinLength} from "class-validator";

export class RegisterUserDto {
    @IsEmail()
    readonly email: string;

    @IsString()
    @MinLength(5)
    readonly password: string;
}