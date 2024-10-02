import mongoose, { Document } from "mongoose";

export interface IMediaSharing extends Document {
  user: mongoose.Types.ObjectId;
  url: string;
  createdAt: Date;
}
