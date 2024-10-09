import { Module } from '@nestjs/common';
import { PinnedMessageService } from './pinned-message.service';
import { PinnedMessageController } from './pinned-message.controller';
import { PinnedMessageSchema } from './pinned-message.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'PinnedMessage',
        schema: PinnedMessageSchema,
      },
    ]),
  ],
  providers: [PinnedMessageService],
  controllers: [PinnedMessageController]
})
export class PinnedMessageModule {}
