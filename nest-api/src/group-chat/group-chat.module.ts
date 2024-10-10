import { Module } from '@nestjs/common';
import { GroupChatService } from './group-chat.service';
import { GroupChatController } from './group-chat.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { GroupChatSchema } from './group-chat.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'GroupChat',
        schema: GroupChatSchema,
      },
    ]),
    AuthModule,
  ],
  providers: [GroupChatService],
  controllers: [GroupChatController],
})
export class GroupChatModule {}
