import mongoose, { Document } from 'mongoose';

export interface IUserOnlineStatus extends Document {
  user: mongoose.Types.ObjectId;
  status: string;
  updatedAt: Date;
}

