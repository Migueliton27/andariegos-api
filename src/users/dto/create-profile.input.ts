// profile/dto/create-profile.input.ts
import { InputType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CreateProfileInput {
  @Field()
  @IsString()
  accessToken: string;

  @Field()
  @IsString()
  name: string;

  @Field()
  @IsString()
  nationality: string;

  @Field()
  @IsString()
  state: string;

}
