import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ChannelUserService } from "./channel-user.service";
import { ChannelUserController } from "./channel-user.controller";
import { ChenelUser, ChenelUserSchema } from "./schemas/channel-user.schema";
import { User, UserSchema } from "../user/schemas/user.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ChenelUser.name, schema: ChenelUserSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [ChannelUserController],
  providers: [ChannelUserService],
  exports: [ChannelUserService],
})
export class ChannelUserModule {}
