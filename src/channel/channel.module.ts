import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ChenelService } from "./channel.service";
import { ChenelController } from "./channel.controller";
import { Chenel, ChenelSchema } from "./schemas/channel.schema";
import { User, UserSchema } from "../user/schemas/user.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Chenel.name, schema: ChenelSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [ChenelController],
  providers: [ChenelService],
  exports: [ChenelService],
})
export class ChannelModule {}
