import { Module } from '@nestjs/common';
import { GroupMessageService } from './group-message.service';
import { GroupMessageController } from './group-message.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { GroupMessageSchema } from './group-message.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'GroupMessage',
        schema: GroupMessageSchema,
      },
    ]),
  ],
  providers: [GroupMessageService],
  controllers: [GroupMessageController],
})
export class GroupMessageModule {}
