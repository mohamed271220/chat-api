import mongoose, { Document } from "mongoose";

export interface IFriendRequest extends Document {
    sender: mongoose.Types.ObjectId;
    receiver: mongoose.Types.ObjectId;
    status: string;
    createdAt: Date;
  }