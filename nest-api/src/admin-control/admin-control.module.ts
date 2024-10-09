import { Module } from '@nestjs/common';
import { AdminControlService } from './admin-control.service';
import { AdminControlController } from './admin-control.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminControlSchema } from './admin-control.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'AdminControl', schema: AdminControlSchema },
    ]),
  ],
  providers: [AdminControlService],
  controllers: [AdminControlController],
})
export class AdminControlModule {}
