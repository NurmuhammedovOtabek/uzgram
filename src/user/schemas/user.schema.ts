import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<User>;

export enum GenderUser{
    male="male",
    female="female"
}

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop({ unique: true, required: true })
  user_name: string;

  @Prop({ unique: true })
  phone_number: string;

  @Prop({ enum: GenderUser, required: true })
  gender: GenderUser;

  @Prop()
  bio: string;

  @Prop()
  age: number;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  password2nd: string;

  @Prop()
  token:string

  @Prop({default:false})
  is_active:boolean

  @Prop()
  activation_link:string
}

export const UserSchema = SchemaFactory.createForClass(User);
