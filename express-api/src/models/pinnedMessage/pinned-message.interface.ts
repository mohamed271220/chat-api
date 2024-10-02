import mongoose, { Document } from "mongoose";

export interface IPinnedMessage extends Document {
  message: mongoose.Types.ObjectId;
  group: mongoose.Types.ObjectId;
  pinnedBy: mongoose.Types.ObjectId;
  createdAt: Date;
}
