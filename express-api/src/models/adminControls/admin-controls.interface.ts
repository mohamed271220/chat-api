import mongoose, { Document } from "mongoose";

export interface IAdminControl extends Document {
  group: mongoose.Types.ObjectId;
  admin: mongoose.Types.ObjectId;
  permissions: string[];
  createdAt: Date;
}
