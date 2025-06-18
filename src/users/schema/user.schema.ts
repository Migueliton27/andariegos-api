import { Prop, Schema  } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<User> & {};

@Schema()
export class User {
  @Prop({ required: true, unique: true })
    userId: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  name: string;
}
