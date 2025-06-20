import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class User {

  @Field()
  userId: string;

  @Field()
  name: string;

  @Field()
  nationality: string;

  @Field()
  state: string;

}
