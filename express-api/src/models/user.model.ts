import mongoose, { Document, Schema } from "mongoose";

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

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
  isOnline: { type: Boolean, default: false },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
  lastSeen: { type: Date },
  createdAt: { type: Date, default: Date.now },
});

const User: mongoose.Model<IUser> = mongoose.model<IUser>("User", UserSchema);

export default User;
