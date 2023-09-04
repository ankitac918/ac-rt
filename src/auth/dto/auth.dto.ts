import { IsNotEmpty, IsString } from "@nestjs/class-validator"

export class AuthDto {
    @IsString()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    password: string
}