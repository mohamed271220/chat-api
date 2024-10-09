import { Document } from 'mongoose';

export interface IPinnedMessage extends Document {
  message: string;
  group: string;
  pinnedBy: string;
  createdAt: Date;
}
