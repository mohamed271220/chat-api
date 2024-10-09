import { Document } from 'mongoose';

export interface IMessageReaction extends Document {
  message: string;
  user: string;
  reactionType: string;
  createdAt: Date;
}
