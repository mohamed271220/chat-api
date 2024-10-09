import { Module } from '@nestjs/common';
import { MessageReactionService } from './message-reaction.service';
import { MessageReactionController } from './message-reaction.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageReactionSchema } from './essage-reaction.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'MessageReaction',
        schema: MessageReactionSchema,
      },
    ]),
  ],
  providers: [MessageReactionService],
  controllers: [MessageReactionController],
})
export class MessageReactionModule {}
