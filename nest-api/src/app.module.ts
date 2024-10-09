import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configValidationSchema } from './config.schema';
import { AdminControlModule } from './admin-control/admin-control.module';
import { ConversationModule } from './conversation/conversation.module';
import { DirectMessageModule } from './direct-message/direct-message.module';
import { FriendRequestModule } from './friend-request/friend-request.module';
import { GroupChatModule } from './group-chat/group-chat.module';
import { GroupMessageModule } from './group-message/group-message.module';
import { MediaSharingModule } from './media-sharing/media-sharing.module';
import { UserModule } from './user/user.module';
import { NotificationModule } from './notification/notification.module';
import { PinnedMessageModule } from './pinned-message/pinned-message.module';
import { ReactionTypeModule } from './reaction-type/reaction-type.module';
import { MessageReactionModule } from './message-reaction/message-reaction.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
      validationSchema: configValidationSchema,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          uri: configService.get<string>('MONGODB_URI'),
          useNewUrlParser: true,
          useUnifiedTopology: true,
        };
      },
    }),
    AdminControlModule,
    ConversationModule,
    DirectMessageModule,
    FriendRequestModule,
    GroupChatModule,
    GroupMessageModule,
    MediaSharingModule,
    UserModule,
    NotificationModule,
    PinnedMessageModule,
    ReactionTypeModule,
    MessageReactionModule,

    // Import modules
  ],
})
export class AppModule {}
