import { InputType, Field } from '@nestjs/graphql';
import {
  IsString
} from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  @IsString()
  userId: string;
}
