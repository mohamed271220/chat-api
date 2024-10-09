import { Module } from '@nestjs/common';
import { ReactionTypeService } from './reaction-type.service';
import { ReactionTypeController } from './reaction-type.controller';
import { ReactionTypeSchema } from './reaction-type.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'ReactionType',
        schema: ReactionTypeSchema,
      },
    ]),
  ],
  providers: [ReactionTypeService],
  controllers: [ReactionTypeController],
})
export class ReactionTypeModule {}
