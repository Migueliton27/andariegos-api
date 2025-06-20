import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<User> & {};

@Schema()
export class User {
  
  @Prop({ required: true, unique: true })
  userId: string;

  @Prop({ required: true })
  name: string;

   @Prop({ required: true })
  nationality: string;

   @Prop({ required: true })
  state: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
