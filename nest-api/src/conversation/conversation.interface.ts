import { Document } from 'mongoose';

export interface ConversationDocument extends Document {
  participants: string[];
  createdAt: Date;
  updatedAt: Date;
}
