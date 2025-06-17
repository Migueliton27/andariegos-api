import { InputType, Field } from '@nestjs/graphql';
import {
  IsString,
  MinLength,
  MaxLength,
  IsEmail,
  IsArray,
  ArrayNotEmpty,
  IsIn,
  IsOptional,
  IsDate,
  IsEnum,
} from 'class-validator';
import { Role } from '../enums/role.enum';
import { UserState } from '../enums/user-state.enum';

@InputType()
export class CreateUserInput {
  @Field()
  @IsString()
  userId: string;

  @Field()
  @IsString()
  accessToken: string;
}
