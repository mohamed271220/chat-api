import mongoose, { Document } from "mongoose";

export interface IGroupChat extends Document {
  name: string;
  members: mongoose.Types.ObjectId[];
  creator: mongoose.Types.ObjectId;
  createdAt: Date;
}
