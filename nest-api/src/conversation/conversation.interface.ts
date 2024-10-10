import mongoose, { Document } from 'mongoose';

export interface ConversationDocument extends Document {
  participants: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}
