import {
  IsString,
  MaxLength,
  IsArray,
  ArrayNotEmpty,
  IsIn
} from 'class-validator';
import { Role } from 'src/auth/role.enum';

export class CreateUserDto {
    @IsString()
    @MaxLength(100)
    username: string;

    @IsString()
    @MaxLength(100)
    password: string;

    @IsArray()
    @ArrayNotEmpty()
    @IsIn(Object.values(Role), { each: true })
    roles: Role[];
}
