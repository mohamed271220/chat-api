import { Module } from '@nestjs/common';
import { DirectMessageService } from './direct-message.service';
import { DirectMessageController } from './direct-message.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DirectMessage } from './direct-message.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'DirectMessage',
        schema: DirectMessage,
      },
    ]),
    AuthModule,
  ],
  providers: [DirectMessageService],
  controllers: [DirectMessageController],
})
export class DirectMessageModule {}
