import { Module } from '@nestjs/common';
import { MediaSharingService } from './media-sharing.service';
import { MediaSharingController } from './media-sharing.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MediaSharingSchema } from './media-sharing.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'MediaSharing',
        schema: MediaSharingSchema,
      },
    ]),
  ],
  providers: [MediaSharingService],
  controllers: [MediaSharingController]
})
export class MediaSharingModule {}
