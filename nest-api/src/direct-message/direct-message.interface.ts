import { Document } from 'mongoose';
import { IReaction } from '../shared/reaction.schema';

export interface IDirectMessage extends Document {
  sender: string;
  receiver: string;
  conversation: string;
  message?: string;
  media?: string;
  createdAt: Date;
  isRead: boolean;
  deliveredAt?: Date;
  readAt?: Date;
  reactions: IReaction[];
}
