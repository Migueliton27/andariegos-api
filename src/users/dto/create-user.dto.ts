import { IsString, MaxLength } from "class-validator";

export class CreateUserDto {
    @IsString()
    @MaxLength(100)
    username: string;

    @IsString()
    @MaxLength(100)
    password: string;
}
