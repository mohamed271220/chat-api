import { Document } from 'mongoose';
import { IReaction } from '../shared/reaction.schema';

export interface IGroupMessage extends Document {
  group: string;
  sender: string;
  message?: string;
  media?: string;
  createdAt: Date;
  isRead: boolean;
  deliveredAt?: Date;
  readAt?: Date;
  reactions: IReaction[];
}
