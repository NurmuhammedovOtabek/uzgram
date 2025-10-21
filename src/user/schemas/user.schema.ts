import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Chat } from "../../chat/schemas/chat.schema";
import { Relation } from "../../relation/schemas/relation.schema";
import { GroupUser } from "../../group-users/schemas/group-user.schema";

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
  token: string;

  @Prop({ default: false })
  is_active: boolean;

  @Prop()
  activation_link: string;

  @Prop({
    type: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Chat",
      },
    ],
  })
  chats: Chat[];

  @Prop({
    type: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Relation",
      },
    ],
  })
  relation: Relation[];
  @Prop({
    type: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "GroupUser",
      },
    ],
  })
  group_users: GroupUser[];
}

export const UserSchema = SchemaFactory.createForClass(User);
