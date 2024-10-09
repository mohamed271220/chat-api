import { Module } from '@nestjs/common';
import { DirectMessageService } from './direct-message.service';
import { DirectMessageController } from './direct-message.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DirectMessageSchema } from './direct-message.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'DirectMessage',
        schema: DirectMessageSchema,
      },
    ]),
  ],
  providers: [DirectMessageService],
  controllers: [DirectMessageController],
})
export class DirectMessageModule {}
