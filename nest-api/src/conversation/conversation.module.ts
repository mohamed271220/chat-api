import { Module } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { ConversationController } from './conversation.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Conversation } from './conversation.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Conversation',
        schema: Conversation,
      },
    ]),
    AuthModule,
  ],
  providers: [ConversationService],
  controllers: [ConversationController],
})
export class ConversationModule {}
