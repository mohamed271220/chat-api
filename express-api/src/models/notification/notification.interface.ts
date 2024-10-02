import mongoose, { Document } from "mongoose";

export interface INotification extends Document {
  user: mongoose.Types.ObjectId;
  type: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
}
