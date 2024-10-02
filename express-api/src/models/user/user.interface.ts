import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  friends: mongoose.Types.ObjectId[];
  isOnline: boolean;
  resetPasswordToken?: string | null;
  resetPasswordExpires?: Date | null;
  lastSeen?: Date;
  createdAt: Date;
}
