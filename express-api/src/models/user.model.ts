import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  friends: mongoose.Types.ObjectId[];
  isOnline: boolean;
  lastSeen?: Date;
  publicKey: string;
  createdAt: Date;
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
  isOnline: { type: Boolean, default: false },
  lastSeen: { type: Date },
  publicKey: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IUser>("User", UserSchema);
