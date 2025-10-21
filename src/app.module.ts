import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { RegionModule } from './region/region.module';
import { DistrictModule } from './district/district.module';
import { ChatModule } from './chat/chat.module';
import { RelationModule } from './relation/relation.module';
import { ChannelModule } from './channel/channel.module';
import { ChannelUserModule } from './channel-user/channel-user.module';
import { EventModule } from './event/event.module';
import { EventguestsModule } from './eventguests/eventguests.module';
import { GroupModule } from './group/group.module';
import { GroupUserModule } from './group-users/group-users.module';
import { InvitationModule } from './invitation/invitation.module';


@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URI!),
    AdminModule,
    AuthModule,
    UserModule,
    RegionModule,
    DistrictModule,
    ChatModule,
    RelationModule,
    ChannelModule,
    ChannelUserModule,
    EventModule,
    EventguestsModule,
    GroupModule,
    GroupUserModule,
    InvitationModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
