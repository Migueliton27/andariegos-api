import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, HydratedDocument } from "mongoose";

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

export const UserSchema = SchemaFactory.createForClass(User);
