// src/users/dto/user-graphql.dto.ts
import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class UserGraphQL {
  @Field()
  userId: string;
}
