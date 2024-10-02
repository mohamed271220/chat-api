import mongoose, { Document } from "mongoose";

export interface IUserSearchHistory extends Document {
  user: mongoose.Types.ObjectId;
  searchQuery: string;
  createdAt: Date;
}
